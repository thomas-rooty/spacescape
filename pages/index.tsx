import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import IntroScene from '@/pages/introScene'
import DateTimelapse from '@/components/intro/datetimelapse/DateTimelapse'
import { Suspense } from 'react'
import Loader from '@/components/loader/Loader'
import StartBtn from '@/components/intro/buttons/StartBtn'
import Hud from '@/components/hud/Hud'
import { Canvas } from "@react-three/fiber";
import BeginCryo from "@/components/intro/ui/BeginCryo";

export default function Home() {
  // Base values
  const distanceFromCenter = 25

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
          <Canvas shadows={true} camera={{ position: [0, 0, distanceFromCenter], fov: 40 }}>
            <IntroScene />
          </Canvas>
          <Hud />
          <DateTimelapse />
          <StartBtn />
          <BeginCryo />
          <audio id="intro-music" autoPlay={true} loop={true}>
            <source src="/musics/StartingCinematic/Interstellar_Main_Theme.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </Suspense>
    </>
  )
}
