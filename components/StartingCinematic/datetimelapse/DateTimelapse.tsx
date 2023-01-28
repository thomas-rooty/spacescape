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
    // Add styles.yearAnimation to the div with id year
    document.getElementById('year')?.classList.add(styles.yearAnimation)
    setTimeout(() => {
      if (year < 2300) {
        setYear(year + 1)
      } else {
        setYear(2300)
        // Remove styles.yearAnimation to the div with id year
        document.getElementById('year')?.classList.remove(styles.yearAnimation)
      }
    }, 15)
  }

  return (
    <div className={styles.dateTimelapse}>
      <div className={styles.dateText}><b>EARTH - </b><div id='year'>&nbsp;{year}</div></div>
    </div>
  )
}

export default DateTimelapse
