import IntroScene from '@/components/intro/scene/IntroScene'
import DateTimelapse from '@/components/intro/scene/datetimelapse/DateTimelapse'
import StartBtn from '@/components/intro/scene/buttons/StartBtn'
import { createCinematicSlice } from '@/utils/stores/intro.store'

const IntroExperience = () => {
  // Store values
  const endCryo = createCinematicSlice((state) => state.endCryo)

  return (
    <>
      <IntroScene />
      {!endCryo && (
        <>
          <DateTimelapse />
          <StartBtn />
        </>
      )}
    </>
  )
}

export default IntroExperience
