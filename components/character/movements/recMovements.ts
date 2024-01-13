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
  lastPositionRef.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z }

  // Calculate the position difference
  const positionDiff = Math.sqrt((camera.position.x - lastPosition.x) ** 2 + (camera.position.y - lastPosition.y) ** 2 + (camera.position.z - lastPosition.z) ** 2)

  // Determine if the character is still moving
  const isStillMoving = positionDiff > movementThreshold

  // Handle movement emission
  if (isKeyPressed || isStillMoving) {
    isDoneMoving.current = false
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    socket.emit('move', { newPosition, animation: 'CharacterArmature|Run', lookingAt: horizontalLookAtPosition })
  } else if (!isDoneMoving.current) {
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    socket.emit('move', { newPosition, animation: 'CharacterArmature|Idle', lookingAt: horizontalLookAtPosition })
    isDoneMoving.current = true
  }

  // Handle jump initiation
  if (jump && !jumpStartTime) {
    setJumpStartTime(elapsedTime)
  }

  // Handle static jump emission
  if (jumpStartTime) {
    const timeSinceJump = elapsedTime - jumpStartTime
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    if (timeSinceJump < 1.5) {
      socket.emit('move', { newPosition, animation: 'CharacterArmature|Run', lookingAt: horizontalLookAtPosition })
    } else {
      setJumpStartTime(null)
      socket.emit('move', { newPosition, animation: 'CharacterArmature|Idle', lookingAt: horizontalLookAtPosition })
    }
  }
  prevMovementRef.current = isKeyPressed
}
