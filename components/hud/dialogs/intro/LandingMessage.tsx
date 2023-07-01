import styles from '@/styles/Intro.module.css'
import { useEffect } from 'react'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import StartingCounter from '@/components/hud/dialogs/intro/StartingCounter'

const LandingMessage = () => {
  // Get variables and functions from the store
  const eyesClosed = createCharacterSlice((state) => state.eyesClosed)
  const setAdventureStarted = createCinematicSlice((state) => state.setAdventureStarted)
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)

  // If the eyes are closed, show the landing message
  useEffect(() => {
    if (eyesClosed) {
      setTimeout(() => {
        document.getElementById('landingmessage')?.classList.add(styles.show)
        // Wait 10 seconds before starting the adventure
        setTimeout(() => {
          setAdventureStarted(true)
        }, 1000) // 10000
      }, 1000)
    }
  }, [eyesClosed, setAdventureStarted])

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
