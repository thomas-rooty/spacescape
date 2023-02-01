import create from 'zustand'

interface IStore {
  startedGame: boolean
  setStartedGame: (startedGame: boolean) => void
  animationDone: boolean
  setAnimationDone: (animationDone: boolean) => void
  hoverableObjects: any[]
  addObjectAsHoverable: (object: any) => void
  hoveredObject: any
  setObjectAsHovered: (hoveredObject: any) => void
}

export const useStore = create<IStore>((set) => ({
  startedGame: false,
  setStartedGame: (startedGame: boolean) => set({ startedGame }),
  animationDone: false,
  setAnimationDone: (animationDone: boolean) => set({ animationDone }),
  // Add an object to the hoverable objects array, everything in this list will become a hoverable object for the player (if not already in the list)
  hoverableObjects: [],
  addObjectAsHoverable: (object) => {
    set((state) => {
      if (state.hoverableObjects.find(element => element.uuid === object.uuid)) return {};
      return {
        hoverableObjects: state.hoverableObjects.concat(object),
      };
    });
  },
  // Handles the current hovered object by the player (if any)
  hoveredObject: null,
  setObjectAsHovered: (object) => {
    set(() => {
      return {
        hoveredObject: object,
      };
    });
  },
}));
