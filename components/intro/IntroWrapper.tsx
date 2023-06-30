import IntroScene from '@/pages/introScene'
import DateTimelapse from '@/components/intro/datetimelapse/DateTimelapse'
import StartBtn from '@/components/intro/buttons/StartBtn'
import Audios from '@/components/audios/Audios'
import {createCinematicSlice} from '@/utils/stores/intro.store'

const IntroWrapper = () => {
  // Store values
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)

  return (
    <>
      <IntroScene/>
      {!endCryo &&
        <>
          <DateTimelapse/>
          <StartBtn/>
        </>
      }
      <Audios checkInitiated={checkInitiated}/>
    </>
  )
}

export default IntroWrapper
