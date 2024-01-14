import Head from 'next/head'
import { Suspense } from 'react'
import { createCinematicSlice } from '@/stores/intro.store'
import { createInteractionSlice } from '@/stores/interactions.store'
import styles from '@/styles/Home.module.css'
import Loader from '@/components/dom/loader/Loader'
import Hud from '@/components/dom/hud/Hud'
import Dialogs from '@/components/dom/hud/dialogs/Dialogs'
import Audios from '@/components/dom/audios/Audios'
import IntroExperience from '@/components/scenes/intro/IntroExperience'
import PlayingExperience from '@/components/scenes/playing/PlayingExperience'
import PrivateQExperience from '@/components/scenes/privatequarters/PrivateQExperience'
import { SocketManager } from '@/utils/SocketManager'

const Home = () => {
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const inPrivateQuarters = createInteractionSlice((state) => state.inPrivateQuarters)
  return (
    <>
      <Head>
        <title>SpaceScape</title>
        <meta name="description" content="🚀 Jacob stranded on an anonymous planet, gather resources to survive and connect with other survivors!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:description" content="🚀 Jacob stranded on an anonymous planet, gather resources to survive and connect with other survivors!" />
        <meta property="og:title" content="SpaceScape" />
        <meta property="og:image" content="/img/spacescape_banner.png" />
        <meta itemProp="image" content="/img/spacescape_banner.png" />
        <meta name="twitter:image" content="/img/spacescape_banner.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loader />}>
        <Hud />
        <Dialogs />
        <Audios />
        {adventureStarted && <SocketManager />}
        <div className={styles.scenes}>{inPrivateQuarters ? <PrivateQExperience /> : !adventureStarted ? <IntroExperience /> : <PlayingExperience />}</div>
      </Suspense>
    </>
  )
}

export default Home
