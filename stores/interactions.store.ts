import { create } from 'zustand'

interface IInteractionsStore {
  collectedRock: any
  setCollectedRock: (collectedRock: any) => void
  inPrivateQuarters: boolean
  setInPrivateQuarters: (inPrivateQuarters: boolean) => void
}

export const createInteractionSlice = create<IInteractionsStore>((set) => ({
  collectedRock: {},
  setCollectedRock: (collectedRock) => set((state) => ({ ...state, collectedRock })),
  inPrivateQuarters: false,
  setInPrivateQuarters: (inPrivateQuarters) => set((state) => ({ ...state, inPrivateQuarters })),
}))
