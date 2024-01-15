const randomVector = () => [Math.random() * 100 - 50, 0.11, Math.random() * 100 - 50]
const randomRotation = () => [-(Math.PI / 2), 0, Math.random() * 360]
const randomizer = Array.from({ length: 1000 }, () => ({
  random: Math.random(),
  position: randomVector(),
  rotation: randomRotation(),
}))

export { randomizer }
