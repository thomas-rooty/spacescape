import { SpotLight } from '@/components/scenes/common/lights/SpotLight'

const PrivateQLights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <SpotLight position={[-0.65, 0.8, 25]} target={[-0.65, -1, 25]} angle={Math.PI / 5} intensity={0.5} penumbra={0.2} />
      <SpotLight position={[-0.65, 0.8, 24.2]} target={[-0.65, -1, 24]} angle={Math.PI / 5} intensity={0.5} penumbra={0.2} />
    </>
  )
}

export default PrivateQLights
