import styles from '@/styles/Hud.module.css'
import { createCinematicSlice } from '@/stores/intro.store'

// Display interact prompt if hoveredObject is defined
export const InteractPrompt = () => {
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)
  return (
    <div className={`${styles.interactPrompt} ${!hoveredObject ? styles.hide : ''}`}>
      <p>Press E to interact</p>
    </div>
  )
}
