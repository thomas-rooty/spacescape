import { create } from 'zustand'

interface Item {
  itemName: string
  quantity: number
  type: string
  icon: string
}

interface IIventoryStore {
  inventory: {
    items: Item[]
  }
  setInventory: (inventory: { items: Item[] }) => void
  addItem: (itemName: string, quantity: number, type: string, icon: string) => void
}

export const createInventorySlice = create<IIventoryStore>((set) => ({
  inventory: {
    items: [],
  },
  setInventory: (inventory: { items: Item[] }) => set({ inventory }),
  addItem: (itemName, quantity, type, icon) =>
    set((state) => {
      // Clone the current items array
      const newItems = [...state.inventory.items]

      // Find the index of the item if it exists
      const itemIndex = newItems.findIndex((item) => item.itemName === itemName)

      if (itemIndex > -1) {
        // Item exists, update the quantity
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity,
        }
      } else {
        // Item does not exist, add a new item
        newItems.push({ itemName, quantity, type, icon })
      }

      return {
        inventory: {
          ...state.inventory,
          items: newItems,
        },
      }
    }),
}))
