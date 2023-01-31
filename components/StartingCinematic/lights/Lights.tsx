import { useRef } from 'react'

type LightsPosition = {
  light1: [number, number, number]
  light2: [number, number, number]
}

const Lights = () => {
  const LightsPosition: LightsPosition = {
    light1: [-0.98, -1, -0.18],
    light2: [0, 5, 25],
  }

  // Light ref
  const light1Ref = useRef<any>()
  const light2Ref = useRef<any>()

  return (
    <>
      <directionalLight color="#ffffcc" ref={light1Ref} position={LightsPosition.light1} castShadow={false} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <spotLight color="#ffffcc" ref={light2Ref} position={LightsPosition.light2} angle={2} intensity={0.2} castShadow={false} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <ambientLight intensity={0.1} />
      {/* These are boxes that are used to visualize the light sources */}
      <mesh position={LightsPosition.light1}>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <mesh position={LightsPosition.light2}>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  )
}

export default Lights
