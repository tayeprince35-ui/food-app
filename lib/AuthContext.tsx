import { supabase } from "@/lib/supabase";
import { useAddressStore } from "@/store/addressStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useRecentSearchStore } from "@/store/recentSearchStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session, User } from "@supabase/supabase-js";
import { router } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const GUEST_KEY = "heybite_is_guest";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isLoggingOut: boolean;

  // Guest mode
  isGuest: boolean;
  continueAsGuest: () => void;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Guest mode
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const guestFlag = await AsyncStorage.getItem(GUEST_KEY);

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setIsGuest(!session && guestFlag === "true");
      setIsLoading(false);

      if (session?.user) {
        useFavoriteStore.getState().loadFavorites(session.user.id);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // Real account takes over; guest flag is no longer relevant.
        await AsyncStorage.removeItem(GUEST_KEY);
        setIsGuest(false);
      }

      if (event === "SIGNED_OUT") {
        // Manual logout OR expired session.
        // Wipe account-scoped local data…
        useCartStore.getState().clearCart();
        useRecentSearchStore.getState().clearSearches();
        useFavoriteStore.getState().clearFavorites();
        useAddressStore.getState().clearStore();

        // …and drop the user back into guest mode so they can keep browsing.
        setIsGuest(true);
        AsyncStorage.setItem(GUEST_KEY, "true").catch(() => {});
      }

      if (session?.user) {
        // Fires on SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED
        useFavoriteStore.getState().loadFavorites(session.user.id);
      }

      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) setIsGuest(false);
  }, [session]);

  const continueAsGuest = () => {
    setIsGuest(true);
    AsyncStorage.setItem(GUEST_KEY, "true").catch(() => {});
    router.replace("/(tabs)");
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      // The SIGNED_OUT listener above handles clearing + guest flag.
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isLoggingOut,

        // Guest mode
        isGuest,
        continueAsGuest,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
