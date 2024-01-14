import { SpotLight } from '@/components/scenes/common/lights/SpotLight'

const PlayingLights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <fog attach="fog" args={['black', 0, 1200]} />
      <SpotLight position={[0, 7, 20]} target={[6, 0, 28]} angle={360} intensity={1} penumbra={1} distance={100} bias={-0.001} />
    </>
  )
}

export default PlayingLights
