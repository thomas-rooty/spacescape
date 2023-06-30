import { create } from 'zustand'

interface ICinematicStore {
  startedGame: boolean
  setStartedGame: (startedGame: boolean) => void
  animationDone: boolean
  setAnimationDone: (animationDone: boolean) => void
  hoverableObjects: any[]
  addObjectAsHoverable: (object: any) => void
  hoveredObject: any
  setObjectAsHovered: (hoveredObject: any) => void
  audioState: boolean
  setAudioState: (audioState: boolean) => void
  audioVolume: number
  setAudioVolume: (audioVolume: number) => void
  launchInitiated: boolean
  setLaunchInitiated: (launchInitiated: boolean) => void
  checkInitiated: boolean
  setCheckInitiated: (checkInitiated: boolean) => void
  endCryo: boolean
  setEndCryo: (endCryo: boolean) => void
}

export const createCinematicSlice = create<ICinematicStore>((set) => ({
  // Handles the game start state
  startedGame: false,
  setStartedGame: (startedGame: boolean) => set({ startedGame }),
  // Handles the animation done state
  animationDone: false,
  setAnimationDone: (animationDone: boolean) => set({ animationDone }),
  // Add an object to the hoverable objects array
  // Everything in this list will become a hoverable object for the player (if not already in the list)
  hoverableObjects: [],
  addObjectAsHoverable: (object) => {
    set((state) => {
      if (state.hoverableObjects.find(element => element.uuid === object.uuid)) return {}
      return {
        hoverableObjects: state.hoverableObjects.concat(object),
      }
    })
  },
  // Handles the current hovered object by the player (if any)
  hoveredObject: null,
  setObjectAsHovered: (object) => {
    set(() => {
      return {
        hoveredObject: object,
      }
    })
  },
  // Handles the audio state (on/off)
  audioState: true,
  setAudioState: (audioState: boolean) => set({ audioState }),
  // Handles the audio volume (0-1)
  audioVolume: 0.5,
  setAudioVolume: (audioVolume: number) => set({ audioVolume }),
  // Handles the launch initiated statem which is used to trigger the launch animation of the ship
  launchInitiated: false,
  setLaunchInitiated: (launchInitiated: boolean) => set({ launchInitiated }),
  // Handles the check initiated state, which is used to trigger the check animation of the ship
  checkInitiated: false,
  setCheckInitiated: (checkInitiated: boolean) => set({ checkInitiated }),
  // Handles the end cryo state, which is used to trigger the end of the cryo animation
  endCryo: false,
  setEndCryo: (endCryo: boolean) => set({ endCryo }),
}))
