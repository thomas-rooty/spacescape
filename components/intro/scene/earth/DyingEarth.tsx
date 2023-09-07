import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import * as THREE from 'three'

interface DyingEarthProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const DyingEarth = ({ position, rotation, scale }: DyingEarthProps) => {
  const { startedGame, animationDone, setAnimationDone, launchInitiated } = createCinematicSlice(state => ({
    startedGame: state.startedGame,
    animationDone: state.animationDone,
    launchInitiated: state.launchInitiated,
    setAnimationDone: state.setAnimationDone,
  }))

  const planetRef = useRef<any>()
  const earthBaseRef = useRef<any>()
  const earthDyingRef = useRef<any>()
  const cloudsRef = useRef<any>()

  const animationDivisor = useMemo(() => 2, [])

  const [baseTexture, dyingTexture, cloudsTexture] = useTexture(['/models/tex/earth_base.jpg', '/models/tex/earth_dying.jpeg', '/models/tex/earth_clouds.png'])

  useFrame(({ clock }, delta) => {
    const rotationSpeed = clock.getElapsedTime() / 50
    planetRef.current.rotation.y = rotationSpeed
    cloudsRef.current.rotation.y = rotationSpeed

    if (startedGame && !animationDone && !launchInitiated) {
      earthBaseRef.current.material.opacity = THREE.MathUtils.lerp(earthBaseRef.current.material.opacity, 0, delta / animationDivisor)

      if (earthBaseRef.current.material.opacity <= 0.03) {
        earthBaseRef.current.material.opacity = 0
        earthBaseRef.current.visible = false
        setAnimationDone(true)
      }
    }

    if (launchInitiated) {
      planetRef.current.position.z = THREE.MathUtils.lerp(planetRef.current.position.z, -100, delta / animationDivisor)

      const scaleValue = THREE.MathUtils.lerp(planetRef.current.scale.x, 0.1, delta / animationDivisor)
      planetRef.current.scale.set(scaleValue, scaleValue, scaleValue)
    }
  })

  return (
    <group ref={planetRef} name='earth' position={position} rotation={rotation} scale={scale}>
      <mesh name='lands' ref={earthBaseRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach='geometry' args={[1, 32, 32]} />
        <meshLambertMaterial attach='material' map={baseTexture} fog={false} transparent={true} />
      </mesh>
      <mesh name='lands' ref={earthDyingRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach='geometry' args={[0.999, 32, 32]} />
        <meshLambertMaterial attach='material' map={dyingTexture} fog={false} />
      </mesh>
      <mesh name='clouds' ref={cloudsRef} castShadow={true} receiveShadow={true}>
        <sphereGeometry attach='geometry' args={[1.01, 32, 32]} />
        <meshLambertMaterial attach='material' map={cloudsTexture} fog={false} transparent={true} opacity={1} />
      </mesh>
    </group>
  )
}

export default DyingEarth
