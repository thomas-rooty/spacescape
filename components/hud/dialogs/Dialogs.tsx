import { CheckDone } from '@/components/hud/dialogs/intro/CheckDone'
import BeginCryo from '@/components/hud/dialogs/intro/BeginCryo'
import LandingMessage from '@/components/hud/dialogs/intro/LandingMessage'

const Dialogs = () => {
  return (
    <>
      <BeginCryo/>
      <CheckDone />
      <LandingMessage />
    </>
  )
}

export default Dialogs
