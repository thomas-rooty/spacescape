import styles from '@/styles/Hud.module.css'
import React from 'react'
import { createCinematicSlice } from '@/utils/stores/intro.store'

interface CrosshairProps {
  size: number
  thickness: number
}

export const Crosshair = ({ size, thickness }: CrosshairProps) => {
  // Get animationDone
  const animationDone = createCinematicSlice((state) => state.animationDone)
  const hoveredObject = createCinematicSlice((state) => state.hoveredObject)

  // Crosshair color
  let color = 'white'
  if (hoveredObject) {
    color = 'orange'
  }

  let crosshairVert = {
    position: 'absolute',
    width: size + 'px',
    height: thickness + 'px',
    backgroundColor: color,
    left: -size / 2 + 1 + 'px',
  } as React.CSSProperties

  let crosshairHoriz = {
    position: 'absolute',
    width: thickness + 'px',
    height: size + 'px',
    backgroundColor: color,
    top: -size / 2 + 1 + 'px',
  } as React.CSSProperties

  return (
    <div className={styles.null}>
      {animationDone && (
        <div id={styles.crosshair}>
          <div style={crosshairVert}></div>
          <div style={crosshairHoriz}></div>
        </div>
      )}
    </div>
  )
}
