import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { createCinematicSlice } from '@/utils/stores/storeIntro'
import * as THREE from 'three'

interface DyingEarthProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const DyingEarth = ({ position, rotation, scale }: DyingEarthProps) => {
  // Get variables and functions from store
  const startedGame = createCinematicSlice((state) => state.startedGame)
  const animationDone = createCinematicSlice((state) => state.animationDone)
  const setAnimationDone = createCinematicSlice((state) => state.setAnimationDone)
  const launchInitiated = createCinematicSlice((state) => state.launchInitiated)

  // Earth reference
  const planetRef = useRef<any>()
  const earthBaseRef = useRef<any>()
  const earthDyingRef = useRef<any>()
  const cloudsRef = useRef<any>()

  // Useful variables
  const animationDivisor = 2

  // Load textures
  const [baseTexture, dyingTexture, cloudsTexture] = useTexture(['/models/tex/earth_base.jpg', '/models/tex/earth_dying.jpeg', '/models/tex/earth_clouds.png'])

  // Earth and clouds rotations
  useFrame(({ clock }, delta) => {
    // Planet rotation speed
    const rotationSpeed = clock.getElapsedTime() / 50
    planetRef.current.rotation.y = rotationSpeed
    cloudsRef.current.rotation.y = rotationSpeed

    // Begin dying animation on game start true and while opacity is <= 0.03 and animationDone is false (meaning opacity is not 0.03 yet)
    earthBaseRef.current.material.opacity = THREE.MathUtils.lerp(earthBaseRef.current.material.opacity, startedGame ? 0 : 1, delta / animationDivisor)
    if (!animationDone && startedGame && !launchInitiated && earthBaseRef.current.material.opacity <= 0.03) {
      earthBaseRef.current.material.opacity = 0
      earthBaseRef.current.visible = false
      setAnimationDone(true)
    }

    // Begin launch animation on launchInitiated true, which simply is a dying earth going further away and getting smaller
    if (launchInitiated) {
      planetRef.current.position.z = THREE.MathUtils.lerp(planetRef.current.position.z, -100, delta / animationDivisor)
      planetRef.current.scale.x = THREE.MathUtils.lerp(planetRef.current.scale.x, 0.1, delta / animationDivisor)
      planetRef.current.scale.y = THREE.MathUtils.lerp(planetRef.current.scale.y, 0.1, delta / animationDivisor)
      planetRef.current.scale.z = THREE.MathUtils.lerp(planetRef.current.scale.z, 0.1, delta / animationDivisor)
    }
  })

  return (
    <group ref={planetRef} name="earth" position={position} rotation={rotation} scale={scale}>
      <mesh name="lands" ref={earthBaseRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        <meshLambertMaterial attach="material" map={baseTexture} fog={false} transparent={true} />
      </mesh>
      <mesh name="lands" ref={earthDyingRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach="geometry" args={[0.999, 32, 32]} />
        <meshLambertMaterial attach="material" map={dyingTexture} fog={false} />
      </mesh>
      <mesh name="clouds" ref={cloudsRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach="geometry" args={[1.01, 32, 32]} />
        <meshLambertMaterial attach="material" map={cloudsTexture} fog={false} transparent={true} opacity={1} />
      </mesh>
    </group>
  )
}

export default DyingEarth
