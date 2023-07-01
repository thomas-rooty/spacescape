import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'

interface FloorMeshProps {
  rotation: [number, number, number]
  position: [number, number, number]
  size: number
}

const FloorMesh = ({ rotation = [Math.PI / -2, 0, 0], position = [0, 0, 0], size }: FloorMeshProps) => {
  const colorMap = useLoader(TextureLoader, '/models/tex/planetx/ao_map.jpg')
  const displacementMap = useLoader(TextureLoader, '/models/tex/planetx/displacement_map.jpg')
  const normalMap = useLoader(TextureLoader, '/models/tex/planetx/normal_map_opengl.jpg')
  const roughness_map = useLoader(TextureLoader, '/models/tex/planetx/roughness_map.jpg')
  const ao_map = useLoader(TextureLoader, '/models/tex/planetx/ao_map.jpg')

  // Set texture properties
  colorMap.wrapS = RepeatWrapping
  colorMap.wrapT = RepeatWrapping
  colorMap.repeat.set(size, size)

  displacementMap.wrapS = RepeatWrapping
  displacementMap.wrapT = RepeatWrapping
  displacementMap.repeat.set(size, size)

  normalMap.wrapS = RepeatWrapping
  normalMap.wrapT = RepeatWrapping
  normalMap.repeat.set(size, size)

  roughness_map.wrapS = RepeatWrapping
  roughness_map.wrapT = RepeatWrapping
  roughness_map.repeat.set(size, size)

  ao_map.wrapS = RepeatWrapping
  ao_map.wrapT = RepeatWrapping
  ao_map.repeat.set(size, size)

  return (
    <mesh rotation={rotation} position={position} scale={[size, size, 1]}>
      <planeBufferGeometry />
      <meshStandardMaterial map={colorMap} displacementMap={displacementMap} normalMap={normalMap} displacementScale={1} roughnessMap={roughness_map} aoMap={ao_map} />
    </mesh>
  )
}

export default FloorMesh
