import * as THREE from 'three'
import { useRef } from 'react'
import { Instances, Instance, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { randomizer } from '@/components/scenes/common/utils/randomizer'

interface RocksProps {
  count?: number
}

type GLTFResult = GLTF & {
  nodes: {
    Rock_3: THREE.Mesh
  }
  materials: {
    Stone_Dark: THREE.MeshStandardMaterial
  }
}

const Rocks = ({ count = 1000 }: RocksProps) => {
  const { nodes, materials } = useGLTF('/models/rocks/rocks1.glb') as unknown as GLTFResult
  return (
    <Instances castShadow receiveShadow range={count} material={materials.Stone_Dark} geometry={nodes.Rock_3.geometry}>
      {randomizer.map((props, i) => (
        <Rock1 key={i} {...props} scale={[100, 100, 150]} />
      ))}
    </Instances>
  )
}

const Rock1 = ({ ...props }) => {
  const ref = useRef()
  return <Instance ref={ref} {...props} />
}

useGLTF.preload('/models/rocks/rocks1.glb')

export default Rocks
