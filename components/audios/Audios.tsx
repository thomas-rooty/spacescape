import { useEffect } from 'react'
import { createCinematicSlice } from '@/utils/stores/intro.store'

interface AudiosProps {
  checkInitiated: boolean
}

const Audios = (props: AudiosProps) => {
  // Variables and functions from the store
  const { checkInitiated } = props
  const startedGame = createCinematicSlice((state) => state.startedGame)
  const audioState = createCinematicSlice((state) => state.audioState)
  const audioVolume = createCinematicSlice((state) => state.audioVolume)
  const endCryo = createCinematicSlice((state) => state.endCryo)

  // Intro music handler
  useEffect(() => {
    const introMusic = document.getElementById('intro-music') as HTMLAudioElement
    if (startedGame) {
      introMusic.volume = audioVolume
      audioState ? introMusic.play() : introMusic.pause()
    }
  }, [startedGame, audioState, audioVolume])

  // Alert sound handler
  useEffect(() => {
    const alertSound = document.getElementById('alert-sound') as HTMLAudioElement
    if (endCryo && alertSound) {
      alertSound.play()
    }
  }, [endCryo])

  return (
    <>
      {!endCryo && (
        <audio id="intro-music" autoPlay={true} loop={true}>
          <source src="/musics/StartingCinematic/Interstellar_Main_Theme.mp3" type="audio/mpeg" />
        </audio>
      )}
      {!checkInitiated && (
        <audio id="alert-sound" loop={true}>
          <source src="/musics/StartingCinematic/Alert.mp3" type="audio/mpeg" />
        </audio>
      )}
    </>
  )
}

export default Audios
