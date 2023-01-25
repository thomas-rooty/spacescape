const Lights = () => {
  return (
    <>
      <directionalLight
        color="#FDB813"
        position={[5, 5, 3]}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.5} />
      <fog attach="fog" args={["#000000", 0, 0.5]} />
    </>
  );
};

export default Lights;
