import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const MAX_RECENT = 8;

type RecentSearchStore = {
  searches: string[];
  addSearch: (text: string) => void;
  removeSearch: (text: string) => void;
  clearSearches: () => void;
};

export const useRecentSearchStore = create<RecentSearchStore>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (text) => {
        const t = text.trim();
        if (t.length < 2) return;
        set((s) => ({
          // newest first, no duplicates, keep the last 8
          searches: [
            t,
            ...s.searches.filter((x) => x.toLowerCase() !== t.toLowerCase()),
          ].slice(0, MAX_RECENT),
        }));
      },
      removeSearch: (text) =>
        set((s) => ({ searches: s.searches.filter((x) => x !== text) })),
      clearSearches: () => set({ searches: [] }),
    }),
    {
      name: "recent-searches",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);