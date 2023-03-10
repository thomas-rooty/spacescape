import styles from '@/styles/DateTimelapse.module.css'
import { createCinematicSlice } from '@/utils/stores/storeIntro'
import { useState } from 'react'

const DateTimelapse = () => {
  // Get animationDone
  const startedGame = createCinematicSlice((state) => state.startedGame)

  // Year variable that goes from 2023 to 2300
  const [year, setYear] = useState(2023)

  // The dates are going from 2023 to 2300
  if (startedGame) {
    setTimeout(() => {
      if (year < 2300) {
        setYear(year + 1)
      } else {
        setYear(2300)
        document.getElementById('textLast')?.classList.add(styles.showOrWhatItsLeft)
      }
    }, 22)
  }

  return (
    <div className={styles.dateTimelapse}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div className={styles.dateText}>
        A.D.&nbsp;
        <div id="year">{year}</div>
        &nbsp;| EARTH&nbsp;
        <div id="textLast" className={styles.orWhatItsLeft}>
          or what it&apos;s left...
        </div>
      </div>
    </div>
  )
}

export default DateTimelapse
