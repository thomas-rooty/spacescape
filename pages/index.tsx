import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Scene from '@/pages/scene'
import DateTimelapse from '@/components/StartingCinematic/datetimelapse/DateTimelapse'
import { Suspense } from 'react'
import Loader from '@/components/loader/Loader'
import StartBtn from '@/components/StartingCinematic/buttons/StartBtn'
import Hud from '@/components/hud/Hud'

export default function Home() {
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
        <div className={styles.scene}>
          <Scene />
          <Hud />
          <DateTimelapse />
          <StartBtn />
        </div>
      </Suspense>
    </>
  )
}
