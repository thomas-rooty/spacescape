import * as THREE from 'three'
import { useEffect, useRef } from 'react'

interface RocksProps {
  count?: number
}

const Rocks = ({ count = 10 }: RocksProps) => {
  const temp = new THREE.Object3D()
  const rocks = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    // Set position
    if (!rocks.current) return
    for (let i = 0; i < count; i++) {
      // Area of 100x100 around the spaceship which is located at 0, 0, 25
      temp.position.set(Math.random() * 100 - 50, 0.5, Math.random() * 100 - 50)
      temp.updateMatrix()
      rocks.current.setMatrixAt(i, temp.matrix)
    }
    // Update instance
    rocks.current.instanceMatrix.needsUpdate = true
    console.log(rocks)
  }, [])

  return (
    <instancedMesh ref={rocks} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={'red'} />
    </instancedMesh>
  )
}

export default Rocks
