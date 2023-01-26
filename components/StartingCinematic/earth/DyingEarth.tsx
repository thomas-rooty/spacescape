import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {useTexture} from "@react-three/drei"

interface DyingEarthProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const DyingEarth = ({position, rotation, scale}: DyingEarthProps) => {
  // Earth reference
  const planetRef = useRef<any>()
  const earthBaseRef = useRef<any>()
  const earthDyingRef = useRef<any>()
  const cloudsRef = useRef<any>()

  // Earth and clouds rotations
  useFrame(({clock}) => {
    planetRef.current.rotation.y = clock.getElapsedTime() / 50
    cloudsRef.current.rotation.y = clock.getElapsedTime() / 50

    // Slowly turn earthBaseRef and cloudsRef opacity to 0
    if (earthBaseRef.current.material.opacity > 0) {
      earthBaseRef.current.material.opacity -= 0.001;
      cloudsRef.current.material.opacity -= 0.001;
    }
  })

  // Load textures
  const [baseTexture, dyingTexture, cloudsTexture] = useTexture([
    '/models/tex/earth_base.jpg',
    '/models/tex/earth_dying.jpg',
    '/models/tex/earth_clouds.png'
  ])

  return (
    <group ref={planetRef} name="earth" position={position} rotation={rotation} scale={scale}>
      <mesh
        name="lands"
        ref={earthBaseRef}
        castShadow={true}
        receiveShadow={true}
      >
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/>
        <meshLambertMaterial
          attach="material"
          map={baseTexture}
          fog={false}
          transparent={true}
        />
      </mesh>
      <mesh
        name="lands"
        ref={earthDyingRef}
        castShadow={true}
        receiveShadow={true}
      >
        <sphereBufferGeometry attach="geometry" args={[0.99, 32, 32]}/>
        <meshLambertMaterial
          attach="material"
          map={dyingTexture}
          fog={false}
        />
      </mesh>
      <mesh
        name="clouds"
        ref={cloudsRef}
        castShadow={true}
        receiveShadow={true}
      >
        <sphereBufferGeometry attach="geometry" args={[1.01, 32, 32]}/>
        <meshLambertMaterial
          attach="material"
          map={cloudsTexture}
          fog={false}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  )
}

export default DyingEarth
