import * as THREE from 'three'

export const LHand = () => {
  return (
    <mesh castShadow={true}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial color="red" side={THREE.DoubleSide} opacity={0.5} transparent={true} />
    </mesh>
  )
}

export const RHand = () => {
  return (
    <mesh castShadow={true}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} opacity={0.5} transparent={true} />
    </mesh>
  )
}
