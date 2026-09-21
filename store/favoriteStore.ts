import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoriteStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favoriteId) => favoriteId !== id)
            : [...state.favorites, id],
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "heybite-favorites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);