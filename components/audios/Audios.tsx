import { useEffect } from 'react'
import { createCinematicSlice } from '@/utils/stores/intro.store'

const Audios = () => {
  // Variables and functions from the store
  const checkInitiated = createCinematicSlice((state) => state.checkInitiated)
  const startedGame = createCinematicSlice((state) => state.startedGame)
  const audioState = createCinematicSlice((state) => state.audioState)
  const audioVolume = createCinematicSlice((state) => state.audioVolume)
  const endCryo = createCinematicSlice((state) => state.endCryo)
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const animationDone = createCinematicSlice((state) => state.animationDone)

  // Intro music handler
  useEffect(() => {
    const introMusic = document.getElementById('intro-music') as HTMLAudioElement
    if (startedGame) {
      introMusic.volume = audioVolume
      audioState ? introMusic.play() : introMusic.pause()
    }
  }, [startedGame, audioState, audioVolume])

  // Intro welcome voice handler
  useEffect(() => {
    const introVoice = document.getElementById('welcome-commander') as HTMLAudioElement
    if (animationDone) {
      introVoice.volume = audioVolume
      introVoice.play()
    }
  }, [startedGame, audioVolume])

  // Alert sound handler
  useEffect(() => {
    const alertSound = document.getElementById('alert-sound') as HTMLAudioElement
    if (endCryo && alertSound) {
      alertSound.play()
      alertSound.volume = audioVolume
    }
  }, [audioVolume, endCryo])

  // Emergency sound handler
  useEffect(() => {
    const emergencySound = document.getElementById('emergency-sound') as HTMLAudioElement
    if (checkInitiated && emergencySound) {
      emergencySound.play()
      emergencySound.volume = audioVolume
    }
  }, [audioVolume, checkInitiated])

  // Breathing sound handler
  useEffect(() => {
    const breathingSound = document.getElementById('breathing-sound') as HTMLAudioElement
    if (adventureStarted && breathingSound) {
      breathingSound.play()
      breathingSound.volume = audioVolume
    }
  }, [audioVolume, adventureStarted])

  return (
    <>
      {!endCryo && (
        <audio id="intro-music" autoPlay={true} loop={true}>
          <source src="/musics/StartingCinematic/FarFarFar.mp3" type="audio/mpeg" />
        </audio>
      )}
      {animationDone && (
        <audio id="welcome-commander" autoPlay={true} loop={false}>
          <source src="/sounds/voices/WelcomeCommander.mp3" type="audio/mpeg" />
        </audio>
      )}
      {!checkInitiated && (
        <audio id="alert-sound" loop={true}>
          <source src="/sounds/ship/Alert.mp3" type="audio/mpeg" />
        </audio>
      )}
      {checkInitiated && (
        <audio id="emergency-sound" loop={false}>
          <source src="/sounds/ship/emergency.mp3" type="audio/mpeg" />
        </audio>
      )}
      {adventureStarted && (
        <audio id="breathing-sound" loop={true}>
          <source src="/sounds/character/breathing.mp3" type="audio/mpeg" />
        </audio>
      )}
    </>
  )
}

export default Audios
