import styles from '@/styles/Home.module.css'
import IntroScene from '@/components/intro/scene/IntroScene'
import DateTimelapse from '@/components/intro/scene/datetimelapse/DateTimelapse'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { useEffect, useState } from 'react'
import Sidebar from "@/components/intro/sidebar/Sidebar";

const IntroExperience = () => {
  // Store values
  const [showPointerLocker, setShowPointerLocker] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const setStartedGame = createCinematicSlice((state) => state.setStartedGame)

  const hideStartBtn = () => {
    // Hide start button, show pointer locker, and set startedGame to true
    const startBtn = document.getElementById('startBtn')
    if (startBtn) {
      startBtn.classList.add(styles.rocketAnim)
      setTimeout(() => {
        startBtn.remove()
      }, 2000)
    }
    setStartedGame(true)
  }

  // Used to handle user that exit pointer lock mode by pressing ESC and not lock them out
  const pointerLockChange = () => {
    setShowPointerLocker(!showPointerLocker)
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerLockChange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerLockChange, false)
    }
  })

  return (
    <div className={styles.scenes}>
      <IntroScene />
      <div id="startBtn" className={`${styles.welcome} ${showPointerLocker ? styles.show : styles.hide}`}>
        <h1 className={styles.title} onClick={hideStartBtn}>
          EXPLORE
        </h1>
        <h3 className={styles.subtitle}>a new world</h3>
      </div>
      <div onClick={() => setShowSidebar(!showSidebar)} className={`${styles.showSidebarBtn} ${showSidebar ? styles.offsetBtn : ''}`}>
        <img className={styles.caret} src={'/icons/caret-sidebar.svg'} alt="caret-left" />
      </div>
      <Sidebar showSidebar={showSidebar} />
      {!endCryo && <DateTimelapse />}
    </div>
  )
}

export default IntroExperience
