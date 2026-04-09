import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Wrapper to enforce string storage
const asyncStorageWrapper = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name, value) => {
    // Ensure value is a string
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.find((i) => i.id === item.id);
          if (exists) return state;
          return { favorites: [...state.favorites, item] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((i) => i.id !== id),
        })),

      toggleFavorite: (item) => {
        const exists = get().favorites.find((i) => i.id === item.id);
        if (exists) get().removeFavorite(item.id);
        else get().addFavorite(item);
      },

      isFavorite: (id) => get().favorites.some((i) => i.id === id),
    }),
    {
      name: "favorites-storage", // storage key
      storage: asyncStorageWrapper, 
    }
  )
);