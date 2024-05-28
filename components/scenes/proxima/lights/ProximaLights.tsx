import { SpotLight } from '@/components/scenes/common/lights/SpotLight'

const ProximaLights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={['black', 0, 20]} />
      <SpotLight position={[-10, 15, -15]} target={[6, 0, 28]} angle={Math.PI/4} intensity={1.2} penumbra={1} distance={0} bias={-0.000001} />
    </>
  )
}

export default ProximaLights
