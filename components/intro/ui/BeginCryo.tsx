import styles from '@/styles/Intro.module.css'
import { createCinematicSlice } from '@/utils/zustore'
import { useEffect } from 'react'

const BeginCryo = () => {
  // Get launchInitiated from the store
  const launchInitiated = createCinematicSlice((state) => state.launchInitiated)

  // After 10 seconds, append show class to the div
  useEffect(() => {
    if (launchInitiated) {
      document.getElementById('begincryo')?.classList.add(styles.show)
    }
  }, [launchInitiated])

  // A text that appears at the center of the screen saying "Initiating Cryogenic Sleep"
  return (
    <div id="begincryo" className={styles.beginCryo}>
      <h1>Initiating Cryogenic Sleep</h1>
    </div>
  )
}

export default BeginCryo
