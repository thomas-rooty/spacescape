import { create } from 'zustand'

interface ICharacterStore {
  shaking: boolean
  setShaking: (shaking: boolean) => void
  eyesClosed: boolean
  setEyesClosed: (eyesClosed: boolean) => void
}

export const createCharacterSlice = create<ICharacterStore>((set) => ({
  shaking: false,
  setShaking: (shaking: boolean) => set({ shaking }),
  eyesClosed: false,
  setEyesClosed: (eyesClosed: boolean) => set({ eyesClosed }),
}))
