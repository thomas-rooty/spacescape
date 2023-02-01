import { SphereProps, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import { useControls } from '@/utils/useControls'
import {useStore} from "@/utils/zustore";
import * as THREE from 'three'

const BaseCharacter = (props: SphereProps) => {
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const speed = new THREE.Vector3()
  const SPEED = 0.5

  const { camera } = useThree()

  // Character collision sphere
  const [ref, api] = useSphere<any>(() => ({
    mass: 1,
    type: 'Dynamic',

    position: [0, 10, 0],
    ...props,
  }))

  // Character movement
  const { forward, backward, left, right, jump } = useControls()
  const velocity = useRef<any>([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])

  // Raycast initialization, gathering of the functions and variables from the store needed to perform hoverable objects detection
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const hoverableObjects = useStore((state) => state.hoverableObjects)
  const addObjectAsHoverable = useStore((state) => state.addObjectAsHoverable)
  const hoveredObject = useStore((state) => state.hoveredObject)
  const setObjectAsHovered = useStore((state) => state.setObjectAsHovered)

  useFrame(({ clock }) => {
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (jump && Math.abs(velocity.current[1].toFixed(3)) < 0.001) api.velocity.set(velocity.current[0], 1.07, velocity.current[2])

    // Head bobbing effect according to the player movement behavior
    if (direction.x !== 0 || direction.z !== 0) {
      camera.position.y += Math.sin(clock.getElapsedTime() * 20) / 250
    } else {
      camera.position.y += Math.sin(clock.getElapsedTime() * 2) / 1000
    }

    // Raycast detection system
    raycaster.set(camera.position, camera.getWorldDirection(new THREE.Vector3()))
    const intersects = raycaster.intersectObjects(hoverableObjects && Object.keys(hoverableObjects).length > 0 ? hoverableObjects : [])
    if (intersects.length > 0 && intersects[0].distance < 1.3) {
      setObjectAsHovered(intersects[0].object.userData.id)
    } else {
      setObjectAsHovered(null)
    }

    // TESTING, THIS SHOULD BE IN THE HOVERABLE OBJECT COMPONENT DIRECTLY, NOT HERE
    // Add testRef as a hoverable object if not already in the list
    if (testRef.current && testRef.current.uuid) {
      addObjectAsHoverable(testRef.current)
    }

    // Change the color of the testRef object if it is hovered
    if (hoveredObject === 'SHIP_BTN_SELECT') {
      testRef.current.material.color.set('red')
    } else {
      testRef.current.material.color.set('hotpink')
    }
  })

  const testRef = useRef<any>()

  return (
    <group>
      <mesh castShadow={true} position={props.position} ref={ref}>
        <sphereGeometry args={props.args} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
      {/* TESTING, THIS SHOULD BE IN THE HOVERABLE OBJECT COMPONENT DIRECTLY, NOT HERE */}
      <mesh name="COLLISIONBOX_SHIP_BTN_SELECT" position={[-0.72, 0.08, 24.26]} ref={testRef} userData={{ id: 'SHIP_BTN_SELECT' }}>
        <boxBufferGeometry args={[0.07, 0.07, 0.07]} />
        <meshLambertMaterial opacity={0.5} transparent={true} />
      </mesh>
    </group>
  )
}

export default BaseCharacter
