import IntroScene from '@/components/intro/scene/IntroScene'
import DateTimelapse from '@/components/intro/datetimelapse/DateTimelapse'
import StartBtn from '@/components/intro/buttons/StartBtn'
import { createCinematicSlice } from '@/utils/stores/intro.store'

const IntroWrapper = () => {
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

export default IntroWrapper
