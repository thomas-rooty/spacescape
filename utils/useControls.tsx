import { useState, useEffect } from 'react'

export const useControls = () => {
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
    KeyE: 'interact',
    ShiftLeft: 'sprint',
    KeyI: 'inventory',
  }
  const buttons = { 0: 'leftClick', 2: 'rightClick' }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveFieldByKey = (key: string | number) => keys[key as keyof typeof keys]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveFieldByButton = (button: number) => buttons[button as keyof typeof buttons]

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    interact: false,
    sprint: false,
    leftClick: false,
    rightClick: false,
    inventory: false,
  })
  useEffect(() => {
    const handleKeyDown = (e: { code: string }) => {
      if (e.code === 'KeyI') {
        setMovement((m) => ({ ...m, inventory: !m.inventory }))
      } else {
        setMovement((m) => ({
          ...m,
          [moveFieldByKey(e.code)]: true,
        }))
      }
    }

    const handleKeyUp = (e: { code: string }) => {
      if (e.code !== 'KeyI') {
        setMovement((m) => ({
          ...m,
          [moveFieldByKey(e.code)]: false,
        }))
      }
    }

    const handleMouseDown = (e: { button: number }) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByButton(e.button)]: true,
      }))

    const handleMouseUp = (e: { button: number }) =>
      setMovement((m) => ({
        ...m,
        [moveFieldByButton(e.button)]: false,
      }))

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [moveFieldByKey, moveFieldByButton])

  return movement
}
