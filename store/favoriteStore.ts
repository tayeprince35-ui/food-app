import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type FavoriteType = "food" | "restaurant";

export type Favorite = {
  item_type: FavoriteType;
  item_id: string;
};

type FavoriteStore = {
  favorites: Favorite[];
  isFavorite: (type: FavoriteType, id: string) => boolean;
  toggleFavorite: (type: FavoriteType, id: string) => Promise<void>;
  loadFavorites: (userId?: string) => Promise<void>;
  clearFavorites: () => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      isFavorite: (type, id) =>
        get().favorites.some((f) => f.item_type === type && f.item_id === id),

      toggleFavorite: async (type, id) => {
        const currentlyFav = get().isFavorite(type, id);

        set((state) => ({
          favorites: currentlyFav
            ? state.favorites.filter(
                (f) => !(f.item_type === type && f.item_id === id),
              )
            : [...state.favorites, { item_type: type, item_id: id }],
        }));

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return; // guest: local only

        if (currentlyFav) {
          await supabase
            .from("favorites")
            .delete()
            .eq("item_type", type)
            .eq("item_id", id);
        } else {
          await supabase
            .from("favorites")
            .insert({ item_type: type, item_id: id });
        }
      },

      loadFavorites: async (userId) => {
        const uid = userId ?? (await supabase.auth.getUser()).data.user?.id;
        if (!uid) return;

        const { data, error } = await supabase
          .from("favorites")
          .select("item_type, item_id");

        if (error) {
          console.warn("loadFavorites error", error.message);
          return;
        }

        set({ favorites: data ?? [] });
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "heybite-favorites",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
