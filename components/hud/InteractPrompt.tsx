import styles from '@/styles/Hud.module.css'
import { createCinematicSlice } from '@/utils/stores/storeIntro'
import { useEffect } from 'react'

export const InteractPrompt = () => {
  // Display interact prompt if hoveredObject is defined
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)

  useEffect(() => {
    console.log(hoveredObject)
  }, [hoveredObject])

  return (
    <div className={`${styles.interactPrompt} ${!hoveredObject ? styles.hide : ''}`}>
      <p>Press E to interact</p>
    </div>
  )
}
