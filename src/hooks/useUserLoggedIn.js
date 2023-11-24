import { create } from "zustand";

export const useUserLoggedIn = create((set) => ({
  user: {},
  token: "",
  setUser: (data) => {
    set({ user: data.user, token: data.token });
  },
}));
