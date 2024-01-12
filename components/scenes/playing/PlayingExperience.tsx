import PlayingScene from '@/components/scenes/playing/scene/PlayingScene'
import { SocketManager } from '@/utils/SocketManager'

const PlayingExperience = () => {
  return (
    <>
      <SocketManager />
      <PlayingScene />
    </>
  )
}

export default PlayingExperience
