import { useState, useEffect } from 'react'

export const useControls = () => {
  const keys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'jump' }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveFieldByKey = (key: string | number) => keys[key as keyof typeof keys]

  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false })

  useEffect(() => {
    const handleKeyDown = (e: { code: string | number }) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code)]: true,
      }))
    const handleKeyUp = (e: { code: string | number }) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByKey(e.code)]: false,
      }))

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [moveFieldByKey])

  return movement
}
