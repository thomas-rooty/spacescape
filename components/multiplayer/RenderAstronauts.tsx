import React, { memo } from 'react'
import { createAstronautSlice } from '@/stores/astronauts.store'
import { Astronaut } from '@/components/character/Astronaut'
import * as THREE from 'three'

const AstronautMemoized = memo(Astronaut)

const RenderAstronauts = () => {
  const players = createAstronautSlice((state) => state.astronauts)
  return (
    <>
      {players.map((player) => (
        <AstronautMemoized
          key={player.id}
          position={new THREE.Vector3(player.position[0], player.position[1] - 0.25, player.position[2])}
          headColor={player.headColor}
          animationName={player.animation}
          lookingAt={player.lookingAt}
        />
      ))}
    </>
  )
}

export default RenderAstronauts
