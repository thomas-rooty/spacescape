import * as THREE from 'three'
import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'

const SWAY_FREQ = 2
const SWAY_AMP = 0.005
const HANDS_DISTANCE = -0.85
const HANDS_SIDE_OFFSET = -0.1
const HANDS_DOWN_OFFSET = -0.05

export function bindHands(
  cameraDirection: Vector3,
  camera:
    | (OrthographicCamera & {
        manual?: boolean
      })
    | (PerspectiveCamera & {
        manual?: boolean
      }),
  lHandRef: React.MutableRefObject<any>,
  lookAtPosition: Vector3,
  rHandRef: React.MutableRefObject<any>,
  elapsedTime: number,
  isKeyPressed: boolean,
  controls: {
    rightClick: boolean
    left: boolean
    forward: boolean
    sprint: boolean
    leftClick: boolean
    backward: boolean
    interact: boolean
    right: boolean
    jump: boolean
  }
) {
  const leftDirection = new THREE.Vector3().crossVectors(cameraDirection, camera.up).normalize()
  const rightDirection = new THREE.Vector3().crossVectors(cameraDirection, camera.up).normalize().negate()

  const leftHandPosition = new THREE.Vector3()
    .copy(cameraDirection)
    .normalize()
    .add(camera.position)
    .add(leftDirection.multiplyScalar(HANDS_SIDE_OFFSET))
    .add(new THREE.Vector3().copy(camera.up).multiplyScalar(HANDS_DOWN_OFFSET))
    .add(new THREE.Vector3().copy(cameraDirection).multiplyScalar(HANDS_DISTANCE))
  lHandRef.current.position.copy(leftHandPosition)
  lHandRef.current.lookAt(lookAtPosition)

  const rightHandPosition = new THREE.Vector3()
    .copy(cameraDirection)
    .normalize()
    .add(camera.position)
    .add(rightDirection.multiplyScalar(HANDS_SIDE_OFFSET))
    .add(new THREE.Vector3().copy(camera.up).multiplyScalar(HANDS_DOWN_OFFSET))
    .add(new THREE.Vector3().copy(cameraDirection).multiplyScalar(HANDS_DISTANCE))
  rHandRef.current.position.copy(rightHandPosition)
  rHandRef.current.lookAt(lookAtPosition)

  // Sway effect
  const swayOffset = Math.sin(elapsedTime * SWAY_FREQ) * SWAY_AMP
  lHandRef.current.position.x += swayOffset
  lHandRef.current.rotation.z += swayOffset
  rHandRef.current.position.x -= swayOffset
  rHandRef.current.rotation.z -= swayOffset

  if (isKeyPressed) {
    const swayIntensity = controls.sprint ? 7 : 5
    const sway = Math.sin(elapsedTime * SWAY_FREQ * swayIntensity) * SWAY_AMP
    lHandRef.current.position.x += sway
    lHandRef.current.rotation.z += sway
    rHandRef.current.position.x -= sway
    rHandRef.current.rotation.z -= sway
  }
}
