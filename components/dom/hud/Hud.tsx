import styles from '@/styles/Hud.module.css'
import { Crosshair } from '@/components/dom/hud/Crosshair'
import { InteractPrompt } from '@/components/dom/hud/InteractPrompt'
import EyesView from '@/components/dom/hud/effects/intro/EyesView'
import Vitals from '@/components/dom/hud/vitals/Vitals'
import { createCinematicSlice } from '@/utils/stores/intro.store'

const Hud = () => {
  // Crosshair is for the crosshair, duh
  // EyesView is for blinking eyes effect
  // InteractPrompt is for the "Press E to interact" prompt
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  return (
    <div className={styles.hud}>
      <Crosshair size={25} thickness={2} />
      <InteractPrompt />
      <EyesView />
      {adventureStarted && <Vitals />}
    </div>
  )
}

export default Hud
