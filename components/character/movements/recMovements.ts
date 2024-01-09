import * as THREE from 'three'

export const RecMovements = (
  isCurrentlyMoving: boolean,
  camera: THREE.Camera,
  socket: any,
  horizontalLookAtPosition: THREE.Vector3,
  prevMovementRef: React.MutableRefObject<boolean>,
  jump: boolean,
  elapsedTime: number,
  jumpStartTime: number | null,
  setJumpStartTime: React.Dispatch<React.SetStateAction<number | null>>
) => {

  // Handle movement emission
  if (isCurrentlyMoving) {
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    socket.emit('move', { newPosition, isMoving: true, lookingAt: horizontalLookAtPosition })
  } else if (prevMovementRef.current) {
    const newPosition = [camera.position.x, camera.position.y, camera.position.z]
    socket.emit('move', { newPosition, isMoving: false, lookingAt: horizontalLookAtPosition })
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
      socket.emit('move', { newPosition, isMoving: true, lookingAt: horizontalLookAtPosition })
    } else {
      setJumpStartTime(null)
      socket.emit('move', { newPosition, isMoving: false, lookingAt: horizontalLookAtPosition })
    }
  }
  prevMovementRef.current = isCurrentlyMoving
}

