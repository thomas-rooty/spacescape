const seededRandom = (seed: number) => {
  return () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

const rocksSeed = 1628644174
const goldSeed = 987654321

const rocksRandom = seededRandom(rocksSeed)
const goldRandom = seededRandom(goldSeed)

const randomVector = (random: { (): number; (): number }) => [random() * 100 - 50, 0.11, random() * 100 - 50]
const randomRotation = () => [-(Math.PI / 2), 0, Math.random() * 360]

const rocksRandomizer = Array.from({ length: 1000 }, () => ({
  position: randomVector(rocksRandom),
  rotation: randomRotation(),
}))

const goldRandomizer = Array.from({ length: 1000 }, () => ({
  position: randomVector(goldRandom),
  rotation: randomRotation(),
}))

export { rocksRandomizer, goldRandomizer }
