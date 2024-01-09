export const LHand = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export const RHand = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
