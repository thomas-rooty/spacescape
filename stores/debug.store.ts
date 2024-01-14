import { create } from 'zustand'

interface IDebugStore {
  debug: boolean
  position: {
    x: number
    y: number
    z: number
  }
  setPosition: (position: { x: number; y: number; z: number }) => void
}

export const createDebugStore = create<IDebugStore>((set) => ({
  debug: false,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  setPosition: (position: { x: number; y: number; z: number }) => set({ position }),
}))
