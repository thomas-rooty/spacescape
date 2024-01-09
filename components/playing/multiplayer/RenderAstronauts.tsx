import { createAstronautSlice } from '@/utils/stores/astronauts.store'
import { Astronaut } from '@/components/character/Astronaut'
import * as THREE from 'three'

const RenderAstronauts = () => {
  const players = createAstronautSlice((state) => state.astronauts)
  return (
    <>
      {players.map((player: any) => (
        <Astronaut
          key={player.id}
          position={
            new THREE.Vector3(
              player.position[0],
              -0.08,
              player.position[2]
            )
          }
          headColor={player.headColor}
          isMoving={player.isMoving}
          lookingAt={player.lookingAt}
        />
      ))}
    </>
  )
}

export default RenderAstronauts
