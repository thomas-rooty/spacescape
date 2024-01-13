import PrivateQScene from '@/components/scenes/privatequarters/scene/PrivateQScene'
import { SocketManager } from '@/utils/SocketManager'

const PrivateQExperience = () => {
  return (
    <>
      <SocketManager />
      <PrivateQScene />
    </>
  )
}

export default PrivateQExperience
