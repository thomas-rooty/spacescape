import * as THREE from 'three'

export const RecMovements = (
  lastPositionRef: React.MutableRefObject<{ x: number; y: number; z: number }>,
  isDoneMoving: React.MutableRefObject<boolean>,
  isKeyPressed: boolean,
  camera: THREE.Camera,
  socket: any,
  horizontalLookAtPosition: THREE.Vector3,
  prevMovementRef: React.MutableRefObject<boolean>,
  jump: boolean,
  elapsedTime: number,
  jumpStartTime: number | null,
  setJumpStartTime: React.Dispatch<React.SetStateAction<number | null>>
) => {
  // Threshold for detecting significant movement
  const lastPosition = lastPositionRef.current
  const movementThreshold = 0.001
  const jumpThreshold = 0.0035
  lastPositionRef.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }

  // Calculate the position difference
  const positionDiff = Math.sqrt((camera.position.x - lastPosition.x) ** 2 + (camera.position.y - lastPosition.y) ** 2 + (camera.position.z - lastPosition.z) ** 2)

  // Determine if the character is still moving
  const isStillMoving = positionDiff > movementThreshold

  // Determine if the character is falling
  const isFalling = camera.position.y < lastPosition.y - jumpThreshold
  const isJumping = camera.position.y > lastPosition.y + jumpThreshold

  // Handle movement emission
  const emitMoveEvent = (animation: string) => {
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    socket.emit('move', { newPosition, animation, lookingAt: horizontalLookAtPosition })
  }

  // Main logic
  if (!isStillMoving) {
    if (!isDoneMoving.current) {
      console.log('idle')
      emitMoveEvent('idle')
      isDoneMoving.current = true
    }
    return // Not moving
  }
  isDoneMoving.current = false

  if (isJumping) {
    console.log('jumping')
    emitMoveEvent('jump')
  } else if (isFalling) {
    console.log('falling')
    emitMoveEvent('fall')
  }

  if (isKeyPressed) {
    console.log('running')
    emitMoveEvent('run')
  }
  prevMovementRef.current = isKeyPressed
}
