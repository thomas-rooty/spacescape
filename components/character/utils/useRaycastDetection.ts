import { OrthographicCamera, PerspectiveCamera, Raycaster, Vector3 } from 'three'


export function useRaycastDetection(
  socket: any,
  raycaster: Raycaster,
  camera:
    | (OrthographicCamera & {
    manual?: boolean
  })
    | (PerspectiveCamera & {
    manual?: boolean
  }),
  worldDirection: Vector3,
  hoverableObjects: any[],
  setObjectAsHovered: (hoveredObject: any) => void
) {
  const intersectDistance = socket !== null ? 0.5 : 1.3
  raycaster.set(camera.position, camera.getWorldDirection(worldDirection))
  const intersects = raycaster.intersectObjects(hoverableObjects && Object.keys(hoverableObjects).length > 0 ? hoverableObjects : [])
  if (intersects.length > 0 && intersects[0].distance < intersectDistance) {
    setObjectAsHovered(intersects[0].object.userData.id)
  } else {
    setObjectAsHovered(null)
  }
}
