import Wall from '@/components/StartingCinematic/ship/Wall'

const CockpitCollision = () => {
  return (
    <>
      <Wall position={[0.15, 0, 25.25 + 0.25]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]} />
      <Wall position={[-0.3, 0, 25 + 0.2]} rotation={[0, 0, 0]} args={[0.1, 0.4, 0.6]} />
      <Wall position={[0, 0, 25 + 0.28]} rotation={[0, Math.PI / -2, 0]} args={[0.1, 0.4, 0.6]} />
      <Wall position={[0, 0, 25 - 0.1]} rotation={[0, Math.PI / -2, 0]} args={[0.1, 0.4, 0.6]} />
    </>
  )
}

export default CockpitCollision
