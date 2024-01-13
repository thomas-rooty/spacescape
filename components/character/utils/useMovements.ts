import { Vector3 } from 'three'

const MOVEMENT_SPEED = 0.006
const MAX_SPEED = 0.5
const MAX_SPEED_SPRINT = 0.8
const RUN_VEL = 0.02

export function useMovements(controls: any, speedInXZ: number, impulse: Vector3, rightVector: Vector3, forwardVector: Vector3, rigidbody: React.MutableRefObject<any>) {
  const { left, right, forward, backward, sprint } = controls
  if (right && speedInXZ < MAX_SPEED) {
    impulse.sub(rightVector.multiplyScalar(MOVEMENT_SPEED))
  }
  if (left && speedInXZ < MAX_SPEED) {
    impulse.add(rightVector.multiplyScalar(MOVEMENT_SPEED))
  }
  if (forward && speedInXZ < MAX_SPEED) {
    impulse.add(forwardVector.multiplyScalar(MOVEMENT_SPEED))
  }
  if (backward && speedInXZ < MAX_SPEED) {
    impulse.sub(forwardVector.multiplyScalar(MOVEMENT_SPEED))
  }
  if (forward && sprint && speedInXZ < MAX_SPEED_SPRINT) {
    impulse.add(forwardVector.multiplyScalar(RUN_VEL))
  }
  rigidbody.current?.applyImpulse(impulse, true)
}
