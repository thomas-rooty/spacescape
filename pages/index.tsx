import Head from 'next/head'
import { Suspense } from 'react'
import { createCinematicSlice } from '@/utils/stores/intro.store'
import styles from '@/styles/Home.module.css'
import Loader from '@/components/loader/Loader'
import Hud from '@/components/hud/Hud'
import Dialogs from '@/components/hud/dialogs/Dialogs'
import IntroExperience from '@/components/intro/IntroExperience'
import Audios from '@/components/audios/Audios'
import PlayingExperience from '@/components/playing/PlayingExperience'

const Home = () => {
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
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
        <div className={styles.scenes}>{!adventureStarted ? <IntroExperience /> : <PlayingExperience />}</div>
      </Suspense>
    </>
  )
}

export default Home
