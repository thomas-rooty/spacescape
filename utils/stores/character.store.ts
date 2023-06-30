import { create } from 'zustand'

interface ICharacterStore {
  shaking: boolean
  setShaking: (shaking: boolean) => void
}

export const createCharacterSlice = create<ICharacterStore>((set) => ({
  shaking: false,
  setShaking: (shaking: boolean) => set({ shaking }),
}))
