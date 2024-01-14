import styles from '@/styles/Debug.module.css'
import { createDebugStore } from '@/stores/debug.store'
import { Html } from '@react-three/drei'

// This component is heavy, it should be used only in development and in case of need solely !
interface DebugProps {
  debug?: boolean
}

export const Debug = ({ debug }: DebugProps) => {
  const position = createDebugStore((state) => state.position)
  return (
    <>
      {debug && (
        <Html>
          <div className={styles.debug}>
            <div className={styles.debug__item}>
              <h4>Position:</h4>
              <span>x:{position.x.toFixed(2)}</span>
              <span>y:{position.y.toFixed(2)}</span>
              <span>z:{position.z.toFixed(2)}</span>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}
