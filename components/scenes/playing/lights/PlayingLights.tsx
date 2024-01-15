import { SpotLight } from '@/components/scenes/common/lights/SpotLight'

const PlayingLights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <fog attach="fog" args={['black', 0, 12000]} />
      <SpotLight position={[-10, 15, -15]} target={[6, 0, 28]} angle={Math.PI/4} intensity={1.2} penumbra={1} distance={0} bias={-0.000001} />
    </>
  )
}

export default PlayingLights
