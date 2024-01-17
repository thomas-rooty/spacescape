import * as THREE from 'three'

const MOVEMENT_THRESHOLD = 0.001
const JUMP_THRESHOLD = 0.0035

export const RecMovements = (
  lastPositionRef: React.MutableRefObject<{ x: number; y: number; z: number }>,
  isDoneMoving: React.MutableRefObject<boolean>,
  isKeyPressed: boolean,
  camera: THREE.Camera,
  socket: any,
  horizontalLookAtPosition: THREE.Vector3,
  prevMovementRef: React.MutableRefObject<boolean>
) => {
  // Get the last position
  const lastPosition = lastPositionRef.current

  // Helper function to calculate the distance
  const calculateDistance = (position1: THREE.Vector3, position2: { x: any; y: any; z: any }) => {
    return Math.sqrt((position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2 + (position1.z - position2.z) ** 2)
  }

  // Helper function to emit movement event
  const emitMoveEvent = (animation: string) => {
    socket.emit('move', {
      newPosition: [camera.position.x, camera.position.y, camera.position.z],
      animation,
      lookingAt: horizontalLookAtPosition,
    })
  }

  // Update the last position
  lastPositionRef.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }

  // Calculate the position difference
  const positionDiff = calculateDistance(camera.position, lastPosition)

  // Determine movement status
  const isStillMoving = positionDiff > MOVEMENT_THRESHOLD
  const isFalling = camera.position.y < lastPosition.y - JUMP_THRESHOLD
  const isJumping = camera.position.y > lastPosition.y + JUMP_THRESHOLD
  const isInAir = isFalling || isJumping

  // Handle movement emission
  if (!isStillMoving) {
    if (!isDoneMoving.current) {
      emitMoveEvent('idle')
      isDoneMoving.current = true // Instantly stop
    }
    return
  }

  isDoneMoving.current = false // Instantly start

  // Handle unique movement cases
  if (isJumping) {
    emitMoveEvent('jump')
  } else if (isFalling) {
    emitMoveEvent('fall')
  }

  // Running
  if (isKeyPressed && !isInAir) {
    emitMoveEvent('run')
  }

  // Update the previous movement
  prevMovementRef.current = isKeyPressed
}
