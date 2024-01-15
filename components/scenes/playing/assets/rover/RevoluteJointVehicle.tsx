import React, { useRef, RefObject, createRef } from 'react'
import { CylinderCollider, RapierRigidBody, RigidBody, useFixedJoint, useRevoluteJoint } from '@react-three/rapier'
import { Vector3Tuple, Vector4Tuple } from 'three'

// Types for joints and wheel information
type FixedJointProps = {
  body: React.RefObject<RapierRigidBody>
  wheel: React.RefObject<RapierRigidBody>
  body1Anchor: Vector3Tuple
  body1LocalFrame: Vector4Tuple
  body2Anchor: Vector3Tuple
  body2LocalFrame: Vector4Tuple
}

type AxleJointProps = {
  body: React.RefObject<RapierRigidBody>
  wheel: React.RefObject<RapierRigidBody>
  bodyAnchor: Vector3Tuple
  wheelAnchor: Vector3Tuple
  rotationAxis: Vector3Tuple
  isDriven: boolean
}

type WheelInfo = {
  axlePosition: Vector3Tuple
  wheelPosition: Vector3Tuple
  isSteered: boolean
  side: 'left' | 'right'
  isDriven: boolean
}

// FixedJoint component
const FixedJoint = ({ body, wheel, body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame }: FixedJointProps) => {
  useFixedJoint(body, wheel, [body1Anchor, body1LocalFrame, body2Anchor, body2LocalFrame])
  return null
}

// AxleJoint component
const AxleJoint = ({ body, wheel, bodyAnchor, wheelAnchor, rotationAxis, isDriven }: AxleJointProps) => {
  useRevoluteJoint(body, wheel, [bodyAnchor, wheelAnchor, rotationAxis])
  // Additional logic for driven wheels can be implemented here
  return null
}

// RevoluteJointVehicle component
interface RoverModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale: number
}

const RevoluteJointVehicle = ({ position, rotation, scale }: RoverModelProps) => {
  const chassisRef = useRef<RapierRigidBody>(null)

  // Define the wheels' positions and properties
  const wheels: WheelInfo[] = [
    {
      axlePosition: [-1.2 * scale, -0.6 * scale, 0.7 * scale],
      wheelPosition: [-1.2 * scale, -0.4 * scale, scale],
      isSteered: true,
      side: 'left',
      isDriven: false,
    },
    {
      axlePosition: [-1.2 * scale, -0.6 * scale, -0.7 * scale],
      wheelPosition: [-1.2 * scale, -0.4 * scale, -1 * scale],
      isSteered: true,
      side: 'right',
      isDriven: false,
    },
    {
      axlePosition: [1.2 * scale, -0.6 * scale, 0.7 * scale],
      wheelPosition: [1.2 * scale, -0.4 * scale, scale],
      isSteered: false,
      side: 'left',
      isDriven: true,
    },
    {
      axlePosition: [1.2 * scale, -0.6 * scale, -0.7 * scale],
      wheelPosition: [1.2 * scale, -0.4 * scale, -1 * scale],
      isSteered: false,
      side: 'right',
      isDriven: true,
    },
  ]

  const wheelRefs = useRef<RefObject<RapierRigidBody>[]>(wheels.map(() => createRef()))
  const axleRefs = useRef<RefObject<RapierRigidBody>[]>(wheels.map(() => createRef()))

  return (
    <group position={position}>
      {/* chassis */}
      <RigidBody scale={scale} ref={chassisRef} colliders="cuboid" mass={1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.5, 0.5, 1.5]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </RigidBody>

      {/* wheels */}
      {wheels.map((wheel, i) => (
        <React.Fragment key={i}>
          {/* axle */}
          <RigidBody scale={scale} ref={axleRefs.current[i]} position={wheel.axlePosition} colliders="cuboid">
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#999" />
            </mesh>
          </RigidBody>

          {/* wheel */}
          <RigidBody scale={scale} ref={wheelRefs.current[i]} position={wheel.wheelPosition} colliders={false}>
            <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.24, 32]} />
              <meshStandardMaterial color="#666" />
            </mesh>

            <mesh rotation-x={-Math.PI / 2}>
              <cylinderGeometry args={[0.251, 0.251, 0.241, 16]} />
              <meshStandardMaterial color="#000" wireframe />
            </mesh>

            <CylinderCollider mass={0.5} friction={1.5} args={[0.125, 0.25]} rotation={[-Math.PI / 2, 0, 0]} />
          </RigidBody>

          {/* axle to chassis joint */}
          <FixedJoint body={chassisRef} wheel={axleRefs.current[i]} body1Anchor={wheel.axlePosition} body1LocalFrame={[0, 0, 0, scale]} body2Anchor={[0, 0, 0]} body2LocalFrame={[0, 0, 0, scale]} />

          {/* wheel to axle joint */}
          <AxleJoint
            body={axleRefs.current[i]}
            wheel={wheelRefs.current[i]}
            bodyAnchor={[0, 0, wheel.side === 'left' ? 0.35 * scale : -0.35 * scale]}
            wheelAnchor={[0, 0, 0]}
            rotationAxis={[0, 0, scale]}
            isDriven={wheel.isDriven}
          />
        </React.Fragment>
      ))}
    </group>
  )
}

export default RevoluteJointVehicle
