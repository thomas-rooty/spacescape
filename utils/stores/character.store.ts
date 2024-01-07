import { create } from 'zustand'

interface ICharacterStore {
  position: {
    x: number
    y: number
    z: number
  }
  setPosition: (position: { x: number; y: number; z: number }) => void
  shaking: boolean
  setShaking: (shaking: boolean) => void
  eyesClosed: boolean
  setEyesClosed: (eyesClosed: boolean) => void
  isMoving: boolean
  setIsMoving: (isMoving: boolean) => void
}

export const createCharacterSlice = create<ICharacterStore>((set) => ({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  setPosition: (position: { x: number; y: number; z: number }) => set({ position }),
  shaking: false,
  setShaking: (shaking: boolean) => set({ shaking }),
  eyesClosed: false,
  setEyesClosed: (eyesClosed: boolean) => set({ eyesClosed }),
  isMoving: false,
  setIsMoving: (isMoving: boolean) => set({ isMoving }),
}))
