import { SpotLight } from '@/components/scenes/common/lights/SpotLight'

const PlayingLights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <fog attach="fog" args={['black', 0, 12]} />

      <SpotLight position={[0, 10, 25]} target={[0, 0, 25]} angle={Math.PI / 5} intensity={1.5} penumbra={1} distance={100} />
    </>
  )
}

export default PlayingLights
