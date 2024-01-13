import { useEffect } from 'react'
import styles from '@/styles/Hud.module.css'
import { createCinematicSlice } from '@/stores/intro.store'
import { createCharacterSlice } from '@/stores/character.store'

export const EyesView = () => {
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)
  const setEyesClosed = createCharacterSlice((state) => state.setEyesClosed)
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const time = process.env.NODE_ENV === 'production' ? 20000 : 1

  // If check is initiated, add a class called 'closed' to the eyes
  useEffect(() => {
    if (checkInitiated) {
      // Wait 20sec before closing the eyes
      setTimeout(() => {
        document.getElementById('eyes')?.classList.add(styles.closed)
        setEyesClosed(true)
      }, time) // 20000 in production, 1 in development
    }
  }, [checkInitiated, setEyesClosed, time])

  return <>{!adventureStarted && <div id="eyes" className={styles.eyes} />}</>
}

export default EyesView
