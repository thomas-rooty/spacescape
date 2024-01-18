import { create } from 'zustand'

interface IInteractionsStore {
  interactedWith: any
  setInteractedWith: (interactedWith: any) => void
  inPrivateQuarters: boolean
  setInPrivateQuarters: (inPrivateQuarters: boolean) => void
}

export const createInteractionSlice = create<IInteractionsStore>((set) => ({
  interactedWith: {},
  setInteractedWith: (interactedWith) => set((state) => ({ ...state, interactedWith })),
  inPrivateQuarters: false,
  setInPrivateQuarters: (inPrivateQuarters) => set((state) => ({ ...state, inPrivateQuarters })),
}))
