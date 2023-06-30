import styles from '@/styles/Hud.module.css'
import { Crosshair } from '@/components/hud/Crosshair'
import { InteractPrompt } from '@/components/hud/InteractPrompt'
import EyesView from '@/components/hud/effects/intro/EyesView'

const Hud = () => {
  return (
    <div className={styles.hud}>
      <Crosshair size={20} color={'#fff'} thickness={2} />
      <InteractPrompt />
      <EyesView />
    </div>
  )
}

export default Hud
