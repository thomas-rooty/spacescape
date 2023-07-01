import { useEffect } from 'react'
import styles from '@/styles/Hud.module.css'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'

export const EyesView = () => {
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)
  const setEyesClosed = createCharacterSlice((state) => state.setEyesClosed)
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)

  // If check is initiated, add a class called 'closed' to the eyes
  useEffect(() => {
    if (checkInitiated) {
      // Wait 20sec before closing the eyes
      setTimeout(() => {
        document.getElementById('eyes')?.classList.add(styles.closed)
        setEyesClosed(true)
      }, 20000)
    }
  }, [checkInitiated, setEyesClosed])

  return <>{!adventureStarted && <div id="eyes" className={styles.eyes} />}</>
}

export default EyesView
