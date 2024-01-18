import PlayingScene from '@/components/scenes/playing/PlayingScene'
import { SocketManager } from '@/utils/SocketManager'
import Inventory from '@/components/dom/interfaces/Inventory'

const PlayingExperience = () => {
  return (
    <>
      <Inventory />
      <PlayingScene />
    </>
  )
}

export default PlayingExperience
