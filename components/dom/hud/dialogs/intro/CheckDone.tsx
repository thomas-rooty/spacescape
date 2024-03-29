import styles from '@/styles/Dialogs.module.css'
import { createCinematicSlice } from '@/stores/intro.store'
import { createCharacterSlice } from '@/stores/character.store'

export const CheckDone = () => {
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)
  const eyesClosed = createCharacterSlice((state) => state.eyesClosed)

  return (
    <>
      {endCryo && !eyesClosed && (
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
