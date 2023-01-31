import React from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer>
      <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={1} height={400} kernelSize={KernelSize.SMALL} />
    </EffectComposer>
  )
}

export default Effects
