import { CheckDone } from '@/components/dom/hud/dialogs/intro/CheckDone'
import BeginCryo from '@/components/dom/hud/dialogs/intro/BeginCryo'
import LandingMessage from '@/components/dom/hud/dialogs/intro/LandingMessage'

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
