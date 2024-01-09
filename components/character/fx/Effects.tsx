import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur={true}
        luminanceThreshold={0}
        luminanceSmoothing={0}
        opacity={0.666}
        intensity={1}
        kernelSize={KernelSize.HUGE}
      />
    </EffectComposer>
  )
}

export default Effects
