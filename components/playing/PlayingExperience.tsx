import PlayingScene from '@/components/playing/scene/PlayingScene'
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
