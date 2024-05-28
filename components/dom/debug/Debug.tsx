import styles from '@/styles/Debug.module.css'
import { createDebugStore } from '@/stores/debug.store'
import { createSocketSlice } from '@/stores/socket.store'
import { createCinematicSlice } from '@/stores/intro.store'
import { createInteractionSlice } from '@/stores/interactions.store'
import { Html } from '@react-three/drei'

// This component is heavy, it should be used only in development and in case of need solely !
interface DebugProps {
  debug?: boolean
}

export const Debug = ({ debug }: DebugProps) => {
  // Debug info
  const position = createDebugStore((state) => state.position)
  const socket = createSocketSlice((state) => state.socket)

  // Trigger state forceful update
  const setInPrivateQuarters = createInteractionSlice((state) => state.setInPrivateQuarters)
  const setAdventureStarted = createCinematicSlice((state) => state.setAdventureStarted)
  const setCheckInitiated = createCinematicSlice((state) => state.setCheckInitiated)
  const setAnimationDone = createCinematicSlice((state) => state.setAnimationDone)
  const setStartedGame = createCinematicSlice((state) => state.setStartedGame)
  const setEndCryo = createCinematicSlice((state) => state.setEndCryo)

  // Force Intro scene
  const handleIntro = () => {
    console.log('Intro scene')
    window.location.reload()
  }

  // Force Planet X scene
  const handlePlanetX = () => {
    console.log('Planet X')
    setAnimationDone(true)
    setStartedGame(true)
    setEndCryo(true)
    setAdventureStarted(true)
    setCheckInitiated(true)
  }

  // Force Private Q scene
  const handlePrivateQ = () => {
    console.log('Private Q')
    setInPrivateQuarters(true)
  }

  return (
    <>
      {debug && (
        <Html>
          <div className={styles.debug}>
            <div className={styles.debug__item}>
              <h4>Socket ID:</h4>
              <span>{socket?.id || 'Not connected'}</span>
            </div>
            <div className={styles.debug__item}>
              <h4>Position:</h4>
              <span className={styles.separator}>x:{position.x.toFixed(2)}</span>
              <span className={styles.separator}>y:{position.y.toFixed(2)}</span>
              <span>z:{position.z.toFixed(2)}</span>
            </div>
            <div className={styles.debug__item}>
              <h4>Intro screen:</h4>
              <button onClick={handleIntro}>Run</button>
            </div>
            <div className={styles.debug__item}>
              <h4>Planet X:</h4>
              <button onClick={handlePlanetX}>Run</button>
            </div>
            <div className={styles.debug__item}>
              <h4>Private Q:</h4>
              <button onClick={() => handlePrivateQ()}>Run</button>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}
