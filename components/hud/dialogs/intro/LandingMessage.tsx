import styles from '@/styles/Intro.module.css'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { useEffect } from 'react'

const LandingMessage = () => {
  // Get variables and functions from the store
  const eyesClosed = createCharacterSlice((state) => state.eyesClosed)

  // If the eyes are closed, show the landing message
  useEffect(() => {
    if (eyesClosed) {
      document.getElementById('landingmessage')?.classList.add(styles.show)
    }
  }, [eyesClosed])

  return (
    <div id="landingmessage" className={styles.landingMessage}>
      <div id="step1" className={styles.step1}>
        <h1>You have landed on a new planet...</h1>
        <p>Good luck commander, and try not to die, please!</p>
      </div>
    </div>
  )
}

export default LandingMessage
