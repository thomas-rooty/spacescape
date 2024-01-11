import { SphereProps, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useControls } from '@/utils/useControls'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { RecMovements } from '@/components/character/movements/recMovements'
import { LHand, RHand } from '@/components/character/hands/InHands'
import * as THREE from 'three'

interface BaseCharacterProps {
  position: [number, number, number]
  args: [number]
  canMove: boolean
}

const BaseCharacter = (props: SphereProps & BaseCharacterProps) => {
  // Astronauts list
  const socket = createSocketSlice((state) => state.socket)

  // Base variables
  const direction = useMemo(() => new THREE.Vector3(), [])
  const frontVector = useMemo(() => new THREE.Vector3(), [])
  const sideVector = useMemo(() => new THREE.Vector3(), [])
  const speed = useMemo(() => new THREE.Vector3(), [])
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const lookAtDirection = new THREE.Vector3()
  const prevMovementRef = useRef<boolean>(false)
  const [jumpStartTime, setJumpStartTime] = useState<number | null>(null)
  const SPEED = 0.5
  const { camera } = useThree()

  // Collision sphere for character
  const [ref, api] = useSphere<any>(() => ({
    mass: 0.01,
    type: 'Dynamic',
    ...props,
  }))

  // Hands ref
  const lHandRef = useRef<any>()
  const rHandRef = useRef<any>()

  // Movement system
  const setPosition = createCharacterSlice((state) => state.setPosition)
  const { forward, backward, left, right, jump } = useControls()
  const velocity = useRef<any>([0, 0, 0])

  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])
  useEffect(
    () =>
      api.position.subscribe((p) =>
        setPosition({
          x: p[0],
          y: p[1],
          z: p[2],
        }),
      ),
    [api.position, setPosition],
  )

  // Detecting objects in front of the character
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const hoverableObjects = createCinematicSlice((state) => state.hoverableObjects)
  const setObjectAsHovered = createCinematicSlice((state) => state.setObjectAsHovered)
  const shaking = createCharacterSlice((state) => state.shaking)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Movement
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    // Movement and breathing effect
    if (props.canMove) {
      api.velocity.set(direction.x, velocity.current[1], direction.z)
      if (jump && Math.abs(velocity.current[1].toFixed(3)) < 0.001) api.velocity.set(velocity.current[0], 1, velocity.current[2])

      // Bobbing effect
      const breathSpeed = 2
      const sway = 250
      if (direction.x !== 0 || direction.z !== 0) {
        // Walking
        camera.position.y += Math.sin(elapsedTime * 20) / 250
        camera.position.y += (Math.sin(elapsedTime * (breathSpeed * 9)) / sway) * 1.2
      } else {
        // Idling
        camera.position.y += Math.sin(elapsedTime * 2) / 1000
        camera.position.y += Math.sin(elapsedTime * breathSpeed) / sway
      }
    }

    // Calculate the horizontal look at position
    const horizontalLookAtPosition = new THREE.Vector3()
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.y = 0 // Ignore Y axis
    lookAtDirection.normalize()
    horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))

    // Determine current movement state
    const isCurrentlyMoving = forward || backward || left || right || jump
    if (socket !== null) {
      RecMovements(isCurrentlyMoving, camera, socket, horizontalLookAtPosition, prevMovementRef, jump, elapsedTime, jumpStartTime, setJumpStartTime)
    }

    // Shaking effect
    if (shaking) {
      camera.position.x += Math.sin(elapsedTime * 200) / 250
      camera.position.y += Math.sin(elapsedTime * 100) / 250
      camera.position.z += Math.sin(elapsedTime * 200) / 250
    }

    // Raycast detection system
    raycaster.set(camera.position, camera.getWorldDirection(worldDirection))
    const intersects = raycaster.intersectObjects(hoverableObjects && Object.keys(hoverableObjects).length > 0 ? hoverableObjects : [])
    if (intersects.length > 0 && intersects[0].distance < 1.3) {
      setObjectAsHovered(intersects[0].object.userData.id)
    } else {
      setObjectAsHovered(null)
    }

    // Hands position
    const handsDistance = -0.85
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    const sideOffset = -0.12
    const downOffset = -0.05

    // LHand left offset
    const leftDirection = new THREE.Vector3()
      .crossVectors(cameraDirection, camera.up)
      .normalize()

    // RHand right offset
    const rightDirection = new THREE.Vector3()
      .crossVectors(cameraDirection, camera.up)
      .normalize()
      .negate()

    // Calculate left hand position + direction
    const leftHandPosition = new THREE.Vector3()
      .copy(cameraDirection)
      .normalize()
      .add(camera.position)
      .add(leftDirection.multiplyScalar(sideOffset))
      .add(new THREE.Vector3().copy(camera.up).multiplyScalar(downOffset))
      .add(new THREE.Vector3().copy(cameraDirection).multiplyScalar(handsDistance))
    lHandRef.current.position.copy(leftHandPosition)
    lHandRef.current.lookAt(horizontalLookAtPosition)

    // Calculate right hand position + direction
    const rightHandPosition = new THREE.Vector3()
      .copy(cameraDirection)
      .normalize()
      .add(camera.position)
      .add(rightDirection.multiplyScalar(sideOffset))
      .add(new THREE.Vector3().copy(camera.up).multiplyScalar(downOffset))
      .add(new THREE.Vector3().copy(cameraDirection).multiplyScalar(handsDistance))
    rHandRef.current.position.copy(rightHandPosition)
    rHandRef.current.lookAt(horizontalLookAtPosition)
  })

  return (
    <>
      <group ref={ref} position={props.position}>
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

export default BaseCharacter
