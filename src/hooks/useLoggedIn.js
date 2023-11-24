import { create } from "zustand";

export const useLoggedIn = create((set) => ({
  loggedIn: false,
  toggleLoggedIn: () => set((state) => ({ loggedIn: !state.loggedIn })),
}));
