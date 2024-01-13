import { create } from 'zustand'

interface IInteractionsStore {
  inPrivateQuarters: boolean
  setInPrivateQuarters: (inPrivateQuarters: boolean) => void
}

export const createInteractionSlice = create<IInteractionsStore>((set) => ({
  inPrivateQuarters: false,
  setInPrivateQuarters: (inPrivateQuarters) => set((state) => ({ ...state, inPrivateQuarters })),
}))
