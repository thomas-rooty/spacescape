import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Scene from "@/pages/scene";

export default function Home() {
  return (
    <>
      <Head>
        <title>SpaceScape</title>
        <meta name="description" content="🚀 Jacob stranded on an anonymous planet, gather resources to survive and connect with other survivors!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Scene />
      </main>
    </>
  )
}
