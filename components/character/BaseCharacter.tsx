import { SphereProps, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { useControls } from '@/utils/useControls'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import * as THREE from 'three'

const BaseCharacter = (props: SphereProps) => {
  // Astronauts list
  const socket = createSocketSlice((state) => state.socket)

  // Base variables
  const direction = useMemo(() => new THREE.Vector3(), [])
  const frontVector = useMemo(() => new THREE.Vector3(), [])
  const sideVector = useMemo(() => new THREE.Vector3(), [])
  const speed = useMemo(() => new THREE.Vector3(), [])
  const worldDirection = useMemo(() => new THREE.Vector3(), [])
  const lookAtDirection = new THREE.Vector3()
  const SPEED = 0.5
  const { camera } = useThree()

  // Collision sphere for character
  const [ref, api] = useSphere<any>(() => ({
    mass: 0.01,
    type: 'Dynamic',
    position: [0, 10, 0],
    ...props,
  }))

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
        })
      ),
    [api.position, setPosition]
  )

  // Detecting objects in front of the character
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const hoverableObjects = createCinematicSlice((state) => state.hoverableObjects)
  const setObjectAsHovered = createCinematicSlice((state) => state.setObjectAsHovered)
  const shaking = createCharacterSlice((state) => state.shaking)

  const prevMovementRef = useRef<boolean>(false)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Movement
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    // Apply movement
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(3)) < 0.001) api.velocity.set(velocity.current[0], 1, velocity.current[2])

    // Calculate the horizontal look at position
    const horizontalLookAtPosition = new THREE.Vector3()
    camera.getWorldDirection(lookAtDirection)
    lookAtDirection.y = 0 // Ignore Y axis
    lookAtDirection.normalize()
    horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10))

    // Determine current movement state
    const isCurrentlyMoving = forward || backward || left || right || jump

    if (socket !== null) {
      if (isCurrentlyMoving) {
        // Moving
        const newPosition = [camera.position.x, camera.position.y, camera.position.z]
        socket.emit('move', { newPosition, isMoving: true, lookingAt: horizontalLookAtPosition })
      } else if (prevMovementRef.current) {
        // Stopped
        const newPosition = [camera.position.x, camera.position.y, camera.position.z]
        socket.emit('move', { newPosition, isMoving: false, lookingAt: horizontalLookAtPosition })
      }
      prevMovementRef.current = isCurrentlyMoving
    }

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
  })

  return (
    <group>
      {props.position && (
        <mesh castShadow={true} ref={ref}>
          <sphereGeometry args={[0, 16, 16]} />
          <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

export default BaseCharacter
