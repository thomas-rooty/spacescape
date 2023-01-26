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
  const earthRef = useRef<any>()
  const cloudsRef = useRef<any>()

  // Earth and clouds rotations
  useFrame(({clock}) => {
    earthRef.current.rotation.y = clock.getElapsedTime() / 33
    cloudsRef.current.rotation.y = clock.getElapsedTime() / 33
  })

  // Load textures
  const [landsTexture, cloudsTexture] = useTexture([
    '/models/tex/earth_dying.jpg',
    '/models/tex/earth_clouds.png'
  ])

  return (
    <group ref={earthRef} name="earth" position={position} rotation={rotation} scale={scale}>
      <mesh
        name="lands"
        castShadow={true}
        receiveShadow={true}
      >
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/>
        <meshLambertMaterial
          attach="material"
          map={landsTexture}
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
