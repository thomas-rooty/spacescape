import styles from '@/styles/Intro.module.css'
import { useEffect } from 'react'
import { createCharacterSlice } from '@/stores/character.store'
import { createCinematicSlice } from '@/stores/intro.store'
import StartingCounter from '@/components/dom/hud/dialogs/intro/StartingCounter'

const LandingMessage = () => {
  // Get variables and functions from the store
  const eyesClosed = createCharacterSlice((state) => state.eyesClosed)
  const setAdventureStarted = createCinematicSlice((state) => state.setAdventureStarted)
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const setShaking = createCharacterSlice((state) => state.setShaking)
  const time = process.env.NODE_ENV === 'production' ? 10000 : 1

  // If the eyes are closed, show the landing message
  useEffect(() => {
    if (eyesClosed) {
      setTimeout(() => {
        document.getElementById('landingmessage')?.classList.add(styles.show)
        // Wait 10 seconds before starting the adventure
        setTimeout(() => {
          setAdventureStarted(true)
          setShaking(false)
        }, time) // 10000 in production, 1 in development
      }, 1000) // 1000
    }
  }, [eyesClosed, setAdventureStarted, setShaking, time])

  return (
    <>
      {eyesClosed && !adventureStarted && (
        <div id="landingmessage" className={styles.landingMessage}>
          <div id="step1" className={styles.step1}>
            <h1>You have landed on an unknown planet...</h1>
            <p>
              Good luck commander, and try not to <span className={styles.die}>Die</span>, please!
            </p>
          </div>
          {!adventureStarted && <StartingCounter />}
        </div>
      )}
    </>
  )
}

export default LandingMessage
