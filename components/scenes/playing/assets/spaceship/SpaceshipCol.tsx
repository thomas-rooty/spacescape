import Wall from '@/components/physics/utils/Wall'

const SpaceshipCol = () => {
  return (
    <>
      <Wall position={[3, 0, 25.6]} rotation={[0, -2, 0]} args={[2, 1.5, 5]} />
    </>
  )
}

export default SpaceshipCol
