import { OrthographicCamera, PerspectiveCamera } from 'three'

export function shakeCamera(
  shaking: boolean,
  camera:
    | (OrthographicCamera & { manual?: boolean })
    | (PerspectiveCamera & {
        manual?: boolean
      }),
  elapsedTime: number
) {
  if (shaking) {
    camera.position.x += Math.sin(elapsedTime * 200) / 25
    camera.position.y += Math.sin(elapsedTime * 100) / 25
    camera.position.z += Math.sin(elapsedTime * 200) / 25
  }
}
