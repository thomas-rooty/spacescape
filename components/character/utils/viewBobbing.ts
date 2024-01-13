import { Clock, OrthographicCamera, PerspectiveCamera, Vector3 } from 'three'

const BREATH_FREQ = 3
const BREATH_AMP = 300

// View bobbing effect
export function viewBobbing(
  isKeyPressed: boolean,
  clock: Clock,
  camera:
    | (OrthographicCamera & {
        manual?: boolean
      })
    | (PerspectiveCamera & { manual?: boolean }),
  characterWorldPosition: Vector3
) {
  if (isKeyPressed) {
    const bobbing = Math.sin(clock.elapsedTime * (BREATH_FREQ * 6)) / (BREATH_AMP / 1.5)
    camera.position.y = characterWorldPosition.y + 0.15 + bobbing
  } else {
    const bobbing = Math.sin(clock.elapsedTime * BREATH_FREQ) / BREATH_AMP
    camera.position.y = characterWorldPosition.y + 0.15 + bobbing
  }
}
