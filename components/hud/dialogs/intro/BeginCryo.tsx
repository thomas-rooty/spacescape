import styles from '@/styles/Intro.module.css'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { useEffect } from 'react'

const BeginCryo = () => {
  // Get variables and functions from the store
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const launchInitiated = createCinematicSlice((state) => state.launchInitiated)
  const setEndCryo = createCinematicSlice((state) => state.setEndCryo)

  // Show the cryo state message when the launch is initiated
  useEffect(() => {
    if (launchInitiated) {
      document.getElementById('begincryo')?.classList.add(styles.show)
      // After 20 seconds, trigger the end of the cryo animation
      setTimeout(() => {
        setEndCryo(true)
      }, 1000) // 20000
    }
  }, [launchInitiated, setEndCryo])

  return (
    <>
      {!endCryo && (
        <div id="begincryo" className={styles.beginCryo}>
          <div id="step1" className={styles.step1}>
            <h1>Initiating Cryogenic Sleep...</h1>
            <p>Goodbye commander, see you in a hundred years.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default BeginCryo
