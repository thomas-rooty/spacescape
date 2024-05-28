import styles from '@/styles/Home.module.css'
import IntroExperience from '@/components/scenes/intro/IntroExperience'
import PlayingExperience from '@/components/scenes/playing/PlayingExperience'
import PrivateQExperience from '@/components/scenes/privatequarters/PrivateQExperience'
import ProximaExperience from '@/components/scenes/proxima/ProximaExperience'
import { createCinematicSlice } from '@/stores/intro.store'
import { createInteractionSlice } from '@/stores/interactions.store'

const Experience = () => {
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const onProxima = createCinematicSlice((state) => state.onProxima)
  const inPrivateQuarters = createInteractionSlice((state) => state.inPrivateQuarters)

  return (
    <div className={styles.scenes}>
      {inPrivateQuarters ? (
        <PrivateQExperience />
      ) : onProxima ? (
        <ProximaExperience />
      ) : !adventureStarted ? (
        <IntroExperience />
      ) : (
        <PlayingExperience />
      )}
    </div>
  )
}

export default Experience
