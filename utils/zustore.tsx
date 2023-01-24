import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set, get) => ({
    startedGame: false,
    setStartedGame: (startedGame: boolean) => set({ startedGame }),
  }))
);
