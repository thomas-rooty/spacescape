import styles from '@/styles/DateTimelapse.module.css';
import {useStore} from "@/utils/zustore";
import {useState} from "react";

const DateTimelapse = () => {
  // Get animationDone
  const startedGame = useStore((state) => state.startedGame)

  // Year variable that goes from 2023 to 2300
  const [year, setYear] = useState(2023)

  // The dates are going from 2023 to 2300
  if (startedGame) {
    setTimeout(() => {
      if (year < 2300) {
        setYear(year + 1)
      } else {
        setYear(2300)
      }
    }, 15)
  }

  return (
    <div className={styles.dateTimelapse}>
      <div className={styles.dateText}>A.D.&nbsp;<div id='year'>{year}</div>&nbsp;| EARTH</div>
    </div>
  )
}

export default DateTimelapse
