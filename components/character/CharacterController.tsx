import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { RecMovements } from '@/components/character/movements/recMovements'
import { LHand, RHand } from '@/components/character/hands/InHands'
import { viewBobbing } from '@/components/character/utils/viewBobbing'
import { applyMovements } from '@/components/character/utils/applyMovements'
import { shakeCamera } from '@/components/character/utils/shakeCamera'
import { raycastDetection } from '@/components/character/utils/raycastDetection'
import { bindHands } from '@/components/character/utils/bindHands'

interface CharacterControllerProps {
  position: [number, number, number]
  canMove: boolean
}

const CharacterController = ({ position, canMove }: CharacterControllerProps) => {
  const rigidbody = useRef<any>()
  const character = useRef<any>()
  const lHandRef = useRef<any>()
  const rHandRef = useRef<any>()
  const isDoneMoving = useRef<boolean>(false)
  const lastPositionRef = useRef({ x: 0, y: 0, z: 0 })
  const prevMovementRef = useRef<boolean>(false)
  const lookAtDirection = new THREE.Vector3()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const [jumpStartTime, setJumpStartTime] = useState<number | null>(null)

  // Store values
  const socket = createSocketSlice((state) => state.socket)
  const shaking = createCharacterSlice((state) => state.shaking)
  const hoverableObjects = createCinematicSlice((state) => state.hoverableObjects)
  const setObjectAsHovered = createCinematicSlice((state) => state.setObjectAsHovered)

  // Controls
  const controls = useControls()
  const isKeyPressed = controls.forward || controls.backward || controls.left || controls.right

  // Character logic
  useFrame(({ camera, clock }) => {
    const elapsedTime = clock.getElapsedTime()
    const cameraDirection = new THREE.Vector3()
    const impulse = new THREE.Vector3()
    const linvel = rigidbody.current?.linvel()
    camera.getWorldDirection(cameraDirection)

    if (!linvel) return
    // Forward and right vectors from camera direction
    const forwardVector = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z)
    const rightVector = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x)

    // Magnitude of velocity in xz-plane
    const speedInXZ = Math.sqrt(linvel.x ** 2 + linvel.z ** 2)

    // First person camera
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())
    camera.position.set(characterWorldPosition.x, characterWorldPosition.y + 0.1, characterWorldPosition.z)

    // Horizontal look at position
    const horizontalLookAtPosition = new THREE.Vector3()
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.y = 0
    lookAtDirection.normalize()
    horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))

    // All-directions look at position
    const lookAtPosition = new THREE.Vector3()
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.normalize()
    lookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))
    camera.getWorldDirection(cameraDirection)

    // Movement
    if (canMove) {
      applyMovements(controls, speedInXZ, impulse, rightVector, forwardVector, rigidbody)
      viewBobbing(isKeyPressed, clock, camera, characterWorldPosition)
    }

    // Camera shaking
    shakeCamera(shaking, camera, elapsedTime)

    // Raycast detection system
    raycastDetection(socket, raycaster, camera, worldDirection, hoverableObjects, setObjectAsHovered)

    // Stream movements to server
    if (socket !== null) {
      RecMovements(lastPositionRef, isDoneMoving, isKeyPressed, camera, socket, horizontalLookAtPosition, prevMovementRef, controls.jump, elapsedTime, jumpStartTime, setJumpStartTime)
    }

    // Hands
    bindHands(cameraDirection, camera, lHandRef, lookAtPosition, rHandRef, elapsedTime, isKeyPressed, controls)
  })

  return (
    <>
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
      <group ref={lHandRef}>
        <LHand />
      </group>
      <group ref={rHandRef}>
        <RHand />
      </group>
    </>
  )
}

export default CharacterController
