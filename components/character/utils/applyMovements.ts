import { Vector3 } from 'three'

const MOVEMENT_SPEED = 0.0009
const MAX_SPEED = 0.4
const MAX_SPEED_SPRINT = 0.8
const RUN_VEL = 0.001
const JUMP_FORCE = 0.0015

export function applyMovements(controls: any, directions: any, speedInXZ: number, impulse: Vector3, rightVector: Vector3, forwardVector: Vector3, rigidbody: React.MutableRefObject<any>, isGrounded: boolean) {
  const { left, right, forward, backward, sprint, jump } = controls
  forwardVector.set(directions.x, 0, directions.z)
  rightVector.set(directions.z, 0, -directions.x)
  const maxSpeed = sprint ? MAX_SPEED_SPRINT : MAX_SPEED

  if (right && speedInXZ < maxSpeed) {
    impulse.sub(rightVector.multiplyScalar(sprint ? RUN_VEL : MOVEMENT_SPEED))
  }
  if (left && speedInXZ < maxSpeed) {
    impulse.add(rightVector.multiplyScalar(sprint ? RUN_VEL : MOVEMENT_SPEED))
  }
  if (forward && speedInXZ < maxSpeed) {
    impulse.add(forwardVector.multiplyScalar(sprint ? RUN_VEL : MOVEMENT_SPEED))
  }
  if (backward && speedInXZ < maxSpeed) {
    impulse.sub(forwardVector.multiplyScalar(MOVEMENT_SPEED))
  }
  if (jump && isGrounded) {
    impulse.y += JUMP_FORCE
  }

  rigidbody.current?.applyImpulse(impulse, true)
}
