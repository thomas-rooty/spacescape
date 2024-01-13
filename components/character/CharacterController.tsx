import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useControls } from '@/utils/useControls'
import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { RecMovements } from '@/components/character/utils/recMovements'
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
  const cameraDirection = useMemo(() => new THREE.Vector3(), [])
  const forwardVector = useMemo(() => new THREE.Vector3(), [])
  const rightVector = useMemo(() => new THREE.Vector3(), [])
  const lookAtPosition = useMemo(() => new THREE.Vector3(), [])
  const lookAtDirection = useMemo(() => new THREE.Vector3(), [])
  const horizontalLookAtPosition = useMemo(() => new THREE.Vector3(), [])
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const [jumpStartTime, setJumpStartTime] = useState<number | null>(null)

  // Store values
  const socket = createSocketSlice((state) => state.socket)
  const shaking = createCharacterSlice((state) => state.shaking)
  const hoverableObjects = createCinematicSlice((state) => state.hoverableObjects)
  const setObjectAsHovered = createCinematicSlice((state) => state.setObjectAsHovered)
  const isGrounded = createCharacterSlice((state) => state.isGrounded)
  const setGrounded = createCharacterSlice((state) => state.setIsGrounded)

  // Controls
  const controls = useControls()
  const isKeyPressed = controls.forward || controls.backward || controls.left || controls.right

  // Character logic
  useFrame(({ camera, clock }) => {
    const impulse = new THREE.Vector3()
    const elapsedTime = clock.getElapsedTime()
    const linvel = rigidbody.current?.linvel()
    camera.getWorldDirection(cameraDirection)

    // Magnitude of velocity in xz-plane
    if (!linvel) return
    const speedInXZ = Math.sqrt(linvel.x ** 2 + linvel.z ** 2)

    // First person camera
    const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3())
    camera.position.set(characterWorldPosition.x, characterWorldPosition.y, characterWorldPosition.z)

    // Horizontal look at position
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.y = 0
    lookAtDirection.normalize()
    horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))

    // All-directions look at position
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.normalize()
    lookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))
    camera.getWorldDirection(cameraDirection)

    // Movement
    if (canMove) {
      applyMovements(controls, cameraDirection, speedInXZ, impulse, rightVector, forwardVector, rigidbody, isGrounded)
      viewBobbing(isKeyPressed, clock, camera, characterWorldPosition)
      bindHands(cameraDirection, camera, lHandRef, lookAtPosition, rHandRef, elapsedTime, isKeyPressed, controls)
    }

    // Camera shaking
    shakeCamera(shaking, camera, elapsedTime)

    // Raycast detection system
    raycastDetection(socket, raycaster, camera, worldDirection, hoverableObjects, setObjectAsHovered)

    // Stream movements to server
    if (socket !== null) {
      RecMovements(lastPositionRef, isDoneMoving, isKeyPressed, camera, socket, horizontalLookAtPosition, prevMovementRef, controls.jump, elapsedTime, jumpStartTime, setJumpStartTime)
    }
  })

  return (
    <>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        position={position}
        enabledRotations={[false, false, false]}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject?.name === 'ground') {
            setGrounded(true)
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject?.name === 'ground') {
            setGrounded(false)
          }
        }}
      >
        <BallCollider args={[0.2]} position={[0, 0, 0]} />
        <group ref={character}>
          <mesh>
            <boxGeometry args={[0.1, 0.15, 0.1]} />
            <meshStandardMaterial color={'orange'} visible={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </RigidBody>
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
