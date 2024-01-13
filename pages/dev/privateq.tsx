import Head from 'next/head'
import { Suspense } from 'react'
import { createCinematicSlice } from '@/stores/intro.store'
import styles from '@/styles/Home.module.css'
import Loader from '@/components/dom/loader/Loader'
import Hud from '@/components/dom/hud/Hud'
import Dialogs from '@/components/dom/hud/dialogs/Dialogs'
import Audios from '@/components/dom/audios/Audios'
import PrivateQExperience from '@/components/scenes/privatequarters/PrivateQExperience'

const PrivateQ = () => {
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
        <div className={styles.scenes}>{!adventureStarted ? <PrivateQExperience /> : null}</div>
      </Suspense>
    </>
  )
}

export default PrivateQ
