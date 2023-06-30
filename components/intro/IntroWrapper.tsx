import IntroScene from '@/pages/introScene'
import DateTimelapse from '@/components/intro/datetimelapse/DateTimelapse'
import StartBtn from '@/components/intro/buttons/StartBtn'
import BeginCryo from '@/components/intro/ui/BeginCryo'
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
          <BeginCryo/>
          <DateTimelapse/>
          <StartBtn/>
        </>
      }
      <audio id='intro-music' autoPlay={true} loop={true}>
        <source src='/musics/StartingCinematic/Interstellar_Main_Theme.mp3' type='audio/mpeg'/>
      </audio>
      {!checkInitiated &&
        <audio id='alert-sound' loop={true}>
          <source src='/musics/StartingCinematic/Alert.mp3' type='audio/mpeg'/>
        </audio>
      }
    </>
  )
}

export default IntroWrapper
