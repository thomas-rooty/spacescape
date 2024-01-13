import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { RepeatWrapping } from 'three'

const FloorMesh = ({ size = [100, 100], subdivisions = [1000, 1000] }) => {
  const colorMap = useLoader(TextureLoader, '/models/tex/planetx/color_map.jpg')
  const displacementMap = useLoader(TextureLoader, '/models/tex/planetx/displacement_map.jpg')
  const normalMap = useLoader(TextureLoader, '/models/tex/planetx/normal_map_opengl.jpg')
  const aoMap = useLoader(TextureLoader, '/models/tex/planetx/ao_map.jpg')

  // Repeat the texture over the large floor
  const repeatFactor = 25 // Adjust this based on your preference
  ;[colorMap, displacementMap, normalMap, aoMap].forEach((texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(repeatFactor, repeatFactor)
  })

  return (
    <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
      <planeGeometry attach="geometry" args={[size[0], size[1], subdivisions[0], subdivisions[1]]} />
      <meshLambertMaterial attach="material" map={colorMap} displacementMap={displacementMap} displacementScale={0.1} normalMap={normalMap} aoMap={aoMap} />
    </mesh>
  )
}

export default FloorMesh
