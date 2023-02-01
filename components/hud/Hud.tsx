import styles from "@/styles/Hud.module.css"
import {Crosshair} from "@/components/hud/Crosshair";

const Hud = () => {
  return (
    <div className={styles.hud}>
      <Crosshair size={20} color={'#fff'} thickness={2}/>
    </div>
  )
}

export default Hud
