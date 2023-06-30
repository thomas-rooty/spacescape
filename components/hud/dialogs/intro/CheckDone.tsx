import styles from '@/styles/Dialogs.module.css'
import { createCinematicSlice } from '@/utils/stores/intro.store'

export const CheckDone = () => {
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)

  return (
    <>
      {endCryo && (
        <div className={`${styles.checkDone} ${endCryo ? styles.hide : ''}`}>
          <h1>ALERT</h1>
          {checkInitiated ? (
            <p>Critical state, you woke up way too early, initiating landing sequence.</p>
          ) : (
            <p>Cryogenic Sleep has been interrupted. Please check the cryo pods status immediately.</p>
          )}
        </div>
      )}
    </>
  )
}
