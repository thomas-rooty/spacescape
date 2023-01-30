import create from 'zustand'

interface IStore {
  startedGame: boolean
  setStartedGame: (startedGame: boolean) => void
  animationDone: boolean
  setAnimationDone: (animationDone: boolean) => void
}

export const useStore = create<IStore>((set) => ({
  startedGame: false,
  setStartedGame: (startedGame: boolean) => set({ startedGame }),
  animationDone: false,
  setAnimationDone: (animationDone: boolean) => set({ animationDone }),
}))
