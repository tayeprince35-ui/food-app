import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const GUEST_ADDRESSES_KEY = "heybite_guest_addresses";

export type Address = {
  id: number;
  label: string;
  address: string;
  landmark: string | null;
  phone: string | null;
  is_default: boolean;
};

export type AddressInput = {
  label: string;
  address: string;
  landmark: string | null;
  phone: string | null;
};

type AddressStore = {
  addresses: Address[];
  loading: boolean;

  // Called from the screen. isGuestMode === true means no Supabase user.
  fetchAddresses: (isGuestMode: boolean) => Promise<void>;

  // Save a new address. Returns true on success.
  addAddress: (input: AddressInput, isGuestMode: boolean) => Promise<boolean>;

  makeDefault: (id: number, isGuestMode: boolean) => Promise<boolean>;

  removeAddress: (id: number, isGuestMode: boolean) => Promise<boolean>;

  // Used by AuthContext
  clearGuestAddresses: () => Promise<void>;
  clearStore: () => void;
};

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [],
  loading: false,

  fetchAddresses: async (isGuestMode) => {
    set({ loading: true });
    try {
      if (isGuestMode) {
        const raw = await AsyncStorage.getItem(GUEST_ADDRESSES_KEY);
        set({ addresses: raw ? JSON.parse(raw) : [] });
      } else {
        const { data, error } = await supabase
          .from("addresses")
          .select("id, label, address, landmark, phone, is_default")
          .order("is_default", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("ADDRESSES FETCH ERROR:", error);
          set({ addresses: [] });
        } else {
          set({ addresses: (data as Address[]) ?? [] });
        }
      }
    } finally {
      set({ loading: false });
    }
  },

  addAddress: async (input, isGuestMode) => {
    const current = get().addresses;
    const isDefault = current.length === 0;

    if (isGuestMode) {
      const newAddress: Address = {
        id: Date.now(),
        ...input,
        is_default: isDefault,
      };
      const updated = isDefault ? [newAddress] : [...current, newAddress];
      await AsyncStorage.setItem(GUEST_ADDRESSES_KEY, JSON.stringify(updated));
      set({ addresses: updated });
      return true;
    }

    const { error } = await supabase
      .from("addresses")
      .insert({ ...input, is_default: isDefault });

    if (error) {
      console.error("ADDRESSES INSERT ERROR:", error);
      return false;
    }

    await get().fetchAddresses(false);
    return true;
  },

  makeDefault: async (id, isGuestMode) => {
    const current = get().addresses;

    if (isGuestMode) {
      const updated = current.map((a) => ({ ...a, is_default: a.id === id }));
      await AsyncStorage.setItem(GUEST_ADDRESSES_KEY, JSON.stringify(updated));
      set({ addresses: updated });
      return true;
    }

    // 1. set the new default
    const { error: setErr } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);

    // 2. unset every other default
    const { error: clearErr } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .neq("id", id);

    if (setErr || clearErr) {
      console.error("ADDRESSES DEFAULT ERROR:", setErr || clearErr);
      return false;
    }

    await get().fetchAddresses(false);
    return true;
  },

  removeAddress: async (id, isGuestMode) => {
    const current = get().addresses;
    const target = current.find((a) => a.id === id);

    if (isGuestMode) {
      let updated = current.filter((a) => a.id !== id);
      if (target?.is_default && updated.length > 0) {
        updated = updated.map((a, i) =>
          i === 0 ? { ...a, is_default: true } : a,
        );
      }
      await AsyncStorage.setItem(GUEST_ADDRESSES_KEY, JSON.stringify(updated));
      set({ addresses: updated });
      return true;
    }

    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      console.error("ADDRESSES DELETE ERROR:", error);
      return false;
    }

    if (target?.is_default) {
      const rest = current.filter((a) => a.id !== id);
      if (rest.length > 0) {
        await supabase
          .from("addresses")
          .update({ is_default: true })
          .eq("id", rest[0].id);
      }
    }

    await get().fetchAddresses(false);
    return true;
  },

  clearGuestAddresses: async () => {
    await AsyncStorage.removeItem(GUEST_ADDRESSES_KEY);
  },

  clearStore: () => set({ addresses: [] }),
}));
