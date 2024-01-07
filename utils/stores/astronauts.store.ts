import { create } from 'zustand'

interface IAstronautStore {
  astronauts: any[]
  setAstronauts: (astronauts: any[]) => void
}

export const createAstronautSlice = create<IAstronautStore>((set) => ({
  astronauts: [],
  setAstronauts: (astronauts) => set({ astronauts }),
}))
