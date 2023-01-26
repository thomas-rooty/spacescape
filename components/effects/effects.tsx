import React from 'react'
import {EffectComposer, Bloom} from '@react-three/postprocessing'
import {KernelSize} from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer>
      <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.7} height={900} kernelSize={KernelSize.LARGE}/>
    </EffectComposer>
  )
}

export default Effects;
