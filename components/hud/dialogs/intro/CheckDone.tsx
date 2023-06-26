import styles from '@/styles/Dialogs.module.css'
import { createCinematicSlice } from '@/utils/stores/storeIntro'

export const CheckDone = () => {
  const endCryo = createCinematicSlice((state) => state.endCryo)

  return (
    <>
      {endCryo && (
        <div className={`${styles.checkDone} ${endCryo ? styles.hide : ''}`}>
          <h1>ALERT</h1>
          <p>Cryogenic Sleep has been interrupted. Please check the cryo pods status immediately.</p>
        </div>
      )}
    </>
  )
}
