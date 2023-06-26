import styles from '@/styles/Intro.module.css'
import { createCinematicSlice } from '@/utils/stores/storeIntro'
import { useEffect } from 'react'

const BeginCryo = () => {
  // Get variables and functions from the store
  const launchInitiated = createCinematicSlice((state) => state.launchInitiated)
  const setEndCryo = createCinematicSlice((state) => state.setEndCryo)

  // Show the cryo state when the launch is initiated
  useEffect(() => {
    // Launch is initiated
    if (launchInitiated) {
      document.getElementById('begincryo')?.classList.add(styles.show)
      // After 20 seconds, trigger the end of the cryo animation
      setTimeout(() => {
        setEndCryo(true)
        // Start the alarm sound
        const alertSound = document.getElementById('alert-sound') as HTMLAudioElement
        if (alertSound) {
          alertSound.play()
        }
      }, 8000)
    }
  }, [launchInitiated, setEndCryo])

  // A text that appears at the center of the screen saying "Initiating Cryogenic Sleep"
  return (
    <div id='begincryo' className={styles.beginCryo}>
      <div id='step1' className={styles.step1}>
        <h1>Initiating Cryogenic Sleep...</h1>
        <p>Goodbye commander, see you in a hundred years.</p>
      </div>
    </div>
  )
}

export default BeginCryo
