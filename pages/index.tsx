import Head from 'next/head'
import { Debug } from '@/components/dom/debug/Debug'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SocketManager } from '@/utils/SocketManager'
import { createCinematicSlice } from '@/stores/intro.store'
import { createDebugStore } from '@/stores/debug.store'
import Experience from '@/components/scenes/common/Experience'
import Loader from '@/components/dom/loader/Loader'
import Hud from '@/components/dom/hud/Hud'
import Dialogs from '@/components/dom/hud/dialogs/Dialogs'
import Audios from '@/components/dom/audios/Audios'

const Home = () => {
  const adventureStarted = createCinematicSlice((state) => state.adventureStarted)
  const debug = createDebugStore((state) => state.debug)
  const isProduction = process.env.NODE_ENV === 'production'
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
      {debug && (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1000, width: '500px', height: '500px' }}>
          <Canvas color={'#fff'} camera={{ position: [0, 0, 0], fov: 75 }}>
            <Debug debug={true} />
          </Canvas>
        </div>
      )}
      {adventureStarted && <SocketManager />}
      <Suspense fallback={<Loader />}>
        <Hud />
        <Dialogs />
        {isProduction && <Audios />}
        <Experience />
      </Suspense>
    </>
  )
}

export default Home
