import * as THREE from 'three'
import Knife from '@/components/assets/items/Knife'

export const LHand = () => {
  return (
    <group>
      <mesh castShadow={true}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="red" side={THREE.DoubleSide} opacity={0} transparent={true} />
      </mesh>
    </group>
  )
}

export const RHand = () => {
  return (
    <group>
      <Knife scale={0.07} rotation={[0, Math.PI / 2, 0]}/>
      <mesh castShadow={true}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="blue" side={THREE.DoubleSide} opacity={0} transparent={true} />
      </mesh>
    </group>
  )
}
