import { CuboidCollider, RigidBody } from '@react-three/rapier'

interface FloorProps {
  color?: string
  position: [number, number, number]
  size: number
  visible?: boolean
}

const Floor = ({ color = 'green', position, size, visible = false }: FloorProps) => {
  return (
    <RigidBody type="fixed" colliders={false} friction={2} name="ground">
      <mesh receiveShadow position={position} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={color} visible={visible} />
      </mesh>
      <CuboidCollider args={[size, 0.1, size]} position={position} />
    </RigidBody>
  )
}

export default Floor
