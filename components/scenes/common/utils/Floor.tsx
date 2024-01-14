import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'

interface FloorProps {
  color?: string
  position: [number, number, number]
  size: number
  visible?: boolean
  friction?: number
}

const Floor = ({ color = 'green', position, size, visible = false, friction = 1 }: FloorProps) => {
  const floor = useRef<any>(null)

  useEffect(() => {
    if (floor.current) {
      floor.current.isWalkable = true
    }
  }, [])

  return (
    <RigidBody ref={floor} type="fixed" colliders={false} friction={friction} name="ground">
      <mesh receiveShadow position={position} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={color} visible={visible} />
      </mesh>
      <CuboidCollider args={[size, 0.1, size]} position={position} />
    </RigidBody>
  )
}

export default Floor
