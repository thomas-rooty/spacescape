import { SphereProps, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import { useControls } from '@/utils/useControls'
import { createSocketSlice } from '@/utils/stores/socket.store'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import { createCharacterSlice } from '@/utils/stores/character.store'
import { createAstronautSlice } from '@/utils/stores/astronauts.store'
import { Astronaut } from '@/components/character/Astronaut'
import * as THREE from 'three'

const BaseCharacter = (props: SphereProps) => {
  // Astronauts list
  const socket = createSocketSlice((state) => state.socket)
  const astronauts = createAstronautSlice((state) => state.astronauts)
  const setAstronauts = createAstronautSlice((state) => state.setAstronauts)

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
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
    ...props,
  }))

  // Astronaut model
  const astronaut = useRef<any>(null)

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
    if (jump && Math.abs(velocity.current[1].toFixed(3)) < 0.001) api.velocity.set(velocity.current[0], 1.07, velocity.current[2])

    // Update astronaut model position
    //astronaut.current.position.copy(ref.current.getWorldPosition(camera.position))

    // Calculate the horizontal look at position
    //const horizontalLookAtPosition = new THREE.Vector3()
    //camera.getWorldDirection(lookAtDirection)
    //lookAtDirection.y = 0 // Ignore Y axis
    //lookAtDirection.normalize()
    //horizontalLookAtPosition.copy(camera.position).add(lookAtDirection.multiplyScalar(10)) // Adjust scalar as needed

    // Update astronaut model orientation
    //astronaut.current.lookAt(horizontalLookAtPosition)

    // Multiplayer movement
    if (forward || backward || left || right || jump) {
      const newPosition = [camera.position.x, camera.position.y, camera.position.z]
      socket.emit('move', newPosition)
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
      <mesh castShadow={true} position={props.position} ref={ref}>
        <sphereGeometry args={props.args} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/*
        <mesh ref={astronaut}>
          <Astronaut position-x={0} headColor={'#ff0000'} />
        </mesh>
      */}
    </group>
  )
}

export default BaseCharacter
