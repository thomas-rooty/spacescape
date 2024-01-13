import { create } from 'zustand'

interface ISocketStore {
  socket: any
  setSocket: (socket: any) => void
}

export const createSocketSlice = create<ISocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set(() => ({ socket })),
}))
