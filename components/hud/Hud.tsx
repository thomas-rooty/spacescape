import styles from "@/styles/Hud.module.css"
import {Crosshair} from "@/components/hud/Crosshair";
import {InteractPrompt} from "@/components/hud/InteractPrompt";

const Hud = () => {
  return (
    <div className={styles.hud}>
      <Crosshair size={20} color={'#fff'} thickness={2}/>
      <InteractPrompt/>
    </div>
  )
}

export default Hud
