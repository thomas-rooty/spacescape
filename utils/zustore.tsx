import create from 'zustand';

interface IStore {
  startedGame: boolean;
  setStartedGame: (startedGame: boolean) => void;
}

export const useStore = create<IStore>(
  (set) => ({
    startedGame: false,
    setStartedGame: (startedGame: boolean) => set({startedGame}),
  }));

// Path: utils\zustore.tsx
