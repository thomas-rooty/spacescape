import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { RecMovements } from '@/components/character/movements/recMovements'

const MOVEMENT_SPEED = 0.006
const MAX_SPEED = 0.5
const MAX_SPEED_SPRINT = 0.8
const RUN_VEL = 0.02

interface CharacterControllerProps {
  position: [number, number, number]
  canMove: boolean
}

const CharacterController = ({ position, canMove }: CharacterControllerProps) => {
  const rigidbody = useRef<any>()
  const character = useRef<any>()
  const lastPositionRef = useRef({ x: 0, y: 0, z: 0 })
  const prevMovementRef = useRef<boolean>(false)
  const isDoneMoving = useRef(false)
  const socket = createSocketSlice((state) => state.socket)
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const lookAtDirection = new THREE.Vector3()
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const [jumpStartTime, setJumpStartTime] = useState<number | null>(null)

  // Store values
  const shaking = createCharacterSlice((state) => state.shaking) // Does the character shake?
  const hoverableObjects = createCinematicSlice((state) => state.hoverableObjects) // Objects that can be hovered
  const setObjectAsHovered = createCinematicSlice((state) => state.setObjectAsHovered) // Add an object into hoverableObjects

  // Controls
  const { forward, backward, left, right, jump, sprint } = useControls()
  const isKeyPressed = forward || backward || left || right

  // Character logic
  useFrame(({ camera, clock }) => {
    const elapsedTime = clock.getElapsedTime()
    const cameraDirection = new THREE.Vector3()
    const impulse = new THREE.Vector3()
    const linvel = rigidbody.current?.linvel()
    camera.getWorldDirection(cameraDirection)

    if (!linvel) return
    // Calculate forward and right vectors from camera direction
    const forwardVector = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z)
    const rightVector = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x)

    // Calculate the magnitude of the velocity in the xz-plane
    const speedInXZ = Math.sqrt(linvel.x ** 2 + linvel.z ** 2)

    // Camera follow
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())
    camera.position.set(characterWorldPosition.x, characterWorldPosition.y + 0.1, characterWorldPosition.z)

    // Movement
    if (canMove) {
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

      // View bobbing effect
      if (forward || backward || left || right) {
        const freq = 15
        const amp = 200
        const bobbing = Math.sin(clock.elapsedTime * freq) / amp
        camera.position.y = characterWorldPosition.y + bobbing + 0.1
      }
    }

    // Apply final impulse to the rigidbody
    rigidbody.current?.applyImpulse(impulse, true)

    // Shaking effect
    if (shaking) {
      camera.position.x += Math.sin(elapsedTime * 200) / 25
      camera.position.y += Math.sin(elapsedTime * 100) / 25
      camera.position.z += Math.sin(elapsedTime * 200) / 25
    }

    // Raycast detection system
    const intersectDistance = socket !== null ? 0.5 : 1.3
    raycaster.set(camera.position, camera.getWorldDirection(worldDirection))
    const intersects = raycaster.intersectObjects(hoverableObjects && Object.keys(hoverableObjects).length > 0 ? hoverableObjects : [])
    if (intersects.length > 0 && intersects[0].distance < intersectDistance) {
      setObjectAsHovered(intersects[0].object.userData.id)
    } else {
      setObjectAsHovered(null)
    }

    // Calculate the horizontal look at position
    const horizontalLookAtPosition = new THREE.Vector3()
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.y = 0
    lookAtDirection.normalize()
    horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))

    // Stream movements to server
    if (socket !== null) {
      RecMovements(lastPositionRef, isDoneMoving, isKeyPressed, camera, socket, horizontalLookAtPosition, prevMovementRef, jump, elapsedTime, jumpStartTime, setJumpStartTime)
    }
  })

  return (
    <group position={position}>
      <RigidBody ref={rigidbody} colliders={false} scale={[0.5, 0.5, 0.5]} enabledRotations={[false, false, false]}>
        <CuboidCollider args={[1.2, 1.2, 1.2]} position={[0, 1.2, 25]} mass={0.1} />
        <group ref={character}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} visible={false} />
          </mesh>
        </group>
      </RigidBody>
    </group>
  )
}

export default CharacterController
