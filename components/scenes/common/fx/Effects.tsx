import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur={true}
        luminanceThreshold={0}
        luminanceSmoothing={0.5}
        opacity={0.8}
        intensity={1.5}
        kernelSize={KernelSize.HUGE}
      />
    </EffectComposer>
  )
}

export default Effects
