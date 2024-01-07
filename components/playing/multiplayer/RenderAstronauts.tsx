import { createAstronautSlice } from '@/utils/stores/astronauts.store'
import { useEffect } from 'react'
import * as THREE from 'three'

const RenderAstronauts = () => {
  const players = createAstronautSlice((state) => state.astronauts)

  useEffect(() => {
    console.log(players)
  }, [players])

  return (
    <group>
      {players.map((player: any) => (
        <group key={player.id}>
          <mesh position={player.position}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={player.headColor} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default RenderAstronauts
