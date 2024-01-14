import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '@/utils/types/shipinteriors.types'
import { RigidBody } from '@react-three/rapier'

interface PrivateQuartersProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const PrivateQuarters = ({ position, rotation, scale }: PrivateQuartersProps) => {
  const { nodes, materials } = useGLTF('/models/interiors/spaceship_interiors/ShipInteriors.glb') as unknown as GLTFResult
  for (const material of Object.values(materials)) {
    material.alphaTest = 1
    material.depthWrite = true
  }

  return (
    <RigidBody type="fixed" colliders={'trimesh'} name="privateq" position={position} rotation={rotation} scale={scale} friction={2}>
      <group name="Scene">
        <group name="Scene_1" rotation={[Math.PI / 2, 0, 0]} scale={0.007}>
          <mesh
            name="Argent2"
            castShadow
            receiveShadow
            geometry={nodes.Argent2.geometry}
            material={materials.Objet3}
            position={[50.564, 737.951, -298.523]}
            rotation={[0, 0.182, 1.184]}
            scale={0.603}
          />
          <mesh name="Argent3" castShadow receiveShadow geometry={nodes.Argent3.geometry} material={materials.Objet3} position={[-28.21, -586.824, -106.533]} scale={0.603} />
          <mesh name="Argent4" castShadow receiveShadow geometry={nodes.Argent4.geometry} material={materials.Objet3} position={[73.272, 767.842, -106.533]} rotation={[0, 0, 1.209]} scale={0.603} />
          <mesh name="Argent5" castShadow receiveShadow geometry={nodes.Argent5.geometry} material={materials.Objet3} position={[73.272, 775.553, -109.915]} rotation={[0, 0, 1.209]} scale={0.603} />
          <mesh
            name="Argent6"
            castShadow
            receiveShadow
            geometry={nodes.Argent6.geometry}
            material={materials.Objet3}
            position={[214.35, 340.141, -77.717]}
            rotation={[-0.058, -0.032, 0.795]}
            scale={0.603}
          />
          <group name="Armoire">
            <mesh name="Boite001" castShadow receiveShadow geometry={nodes.Boite001.geometry} material={materials.Objet3} position={[1150.322, -238.844, -55.68]} scale={0.323} />
            <mesh name="Boite1001" castShadow receiveShadow geometry={nodes.Boite1001.geometry} material={materials.Objet3} position={[969.506, -278.176, -56.041]} scale={[0.209, 0.211, 0.323]} />
            <mesh
              name="Boite2001"
              castShadow
              receiveShadow
              geometry={nodes.Boite2001.geometry}
              material={materials.Objet3}
              position={[1150.322, 59.588, 247.876]}
              rotation={[-1.598, 0, 0]}
              scale={0.323}
            />
            <mesh
              name="Boite3001"
              castShadow
              receiveShadow
              geometry={nodes.Boite3001.geometry}
              material={materials.Objet3}
              position={[747.188, -303.605, 150.102]}
              rotation={[0, -1.527, 0]}
              scale={[0.209, 0.211, 0.323]}
            />
            <mesh
              name="BoiteCarton001"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton001.geometry}
              material={materials.Objet3}
              position={[-407.874, -1138.374, -147.413]}
              rotation={[0, 0, -1.647]}
            />
            <mesh
              name="BoiteCarton1001"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton1001.geometry}
              material={materials.Objet3}
              position={[-319.358, -1143.789, -21.231]}
              rotation={[0, 0, -1.563]}
            />
            <mesh name="BoiteCarton2001" castShadow receiveShadow geometry={nodes.BoiteCarton2001.geometry} material={materials.Objet3} position={[1701.225, -1029.187, -20.651]} />
            <mesh name="BoiteCarton3001" castShadow receiveShadow geometry={nodes.BoiteCarton3001.geometry} material={materials.Objet3} position={[1701.225, -1091.017, -20.651]} />
            <mesh
              name="BoiteCarton4001"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton4001.geometry}
              material={materials.Objet3}
              position={[-9.975, -1159.716, -148.567]}
              rotation={[0, 0, -1.28]}
            />
            <mesh
              name="BoiteCarton5001"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton5001.geometry}
              material={materials.Objet3}
              position={[-436.851, 793.1, -270.055]}
              rotation={[0, 0, -2.957]}
            />
            <mesh
              name="BoiteCarton6001"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton6001.geometry}
              material={materials.Objet3}
              position={[1189.871, 1544.749, -268.03]}
              rotation={[0, -0.012, 2.072]}
            />
            <mesh name="BoiteCarton7" castShadow receiveShadow geometry={nodes.BoiteCarton7.geometry} material={materials.Objet3} position={[-803.947, 973.433, -21.623]} rotation={[0, 0, 1.621]} />
            <mesh
              name="BoiteCarton8"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton8.geometry}
              material={materials.Objet3}
              position={[-2486.28, 601.944, -1065.96]}
              rotation={[1.42, -0.983, -1.719]}
            />
            <mesh name="Etagere001" castShadow receiveShadow geometry={nodes.Etagere001.geometry} material={materials.Objet3} position={[2077.826, -1194.126, 0]} />
          </group>
          <group name="Armoire1" position={[1576.142, 353.017, 0]} rotation={[0, 0, -1.57]}>
            <mesh name="Boite" castShadow receiveShadow geometry={nodes.Boite.geometry} material={materials.Objet3} position={[1150.322, -238.844, -55.68]} scale={0.323} />
            <mesh name="Boite1" castShadow receiveShadow geometry={nodes.Boite1.geometry} material={materials.Objet3} position={[969.506, -278.176, -56.041]} scale={[0.209, 0.211, 0.323]} />
            <mesh name="Boite2" castShadow receiveShadow geometry={nodes.Boite2.geometry} material={materials.Objet3} position={[1150.322, 59.588, 247.876]} rotation={[-1.598, 0, 0]} scale={0.323} />
            <mesh
              name="Boite3"
              castShadow
              receiveShadow
              geometry={nodes.Boite3.geometry}
              material={materials.Objet3}
              position={[747.188, -303.605, 150.102]}
              rotation={[0, -1.527, 0]}
              scale={[0.209, 0.211, 0.323]}
            />
            <mesh name="BoiteCarton" castShadow receiveShadow geometry={nodes.BoiteCarton.geometry} material={materials.Objet3} position={[-407.874, -1138.375, -147.413]} rotation={[0, 0, -1.647]} />
            <mesh name="BoiteCarton1" castShadow receiveShadow geometry={nodes.BoiteCarton1.geometry} material={materials.Objet3} position={[-319.358, -1143.789, -21.231]} rotation={[0, 0, -1.563]} />
            <mesh name="BoiteCarton2" castShadow receiveShadow geometry={nodes.BoiteCarton2.geometry} material={materials.Objet3} position={[1701.225, -1029.187, -20.651]} />
            <mesh name="BoiteCarton3" castShadow receiveShadow geometry={nodes.BoiteCarton3.geometry} material={materials.Objet3} position={[1701.225, -1091.017, -20.651]} />
            <mesh name="BoiteCarton4" castShadow receiveShadow geometry={nodes.BoiteCarton4.geometry} material={materials.Objet3} position={[-9.975, -1159.716, -148.567]} rotation={[0, 0, -1.28]} />
            <mesh name="BoiteCarton5" castShadow receiveShadow geometry={nodes.BoiteCarton5.geometry} material={materials.Objet3} position={[-436.851, 793.1, -270.055]} rotation={[0, 0, -2.957]} />
            <mesh
              name="BoiteCarton6"
              castShadow
              receiveShadow
              geometry={nodes.BoiteCarton6.geometry}
              material={materials.Objet3}
              position={[1189.871, 1544.749, -268.03]}
              rotation={[0, -0.012, 2.072]}
            />
            <mesh name="Etagere" castShadow receiveShadow geometry={nodes.Etagere.geometry} material={materials.Objet3} position={[2077.825, -1194.125, 0]} />
          </group>
          <mesh name="BacBrosse" castShadow receiveShadow geometry={nodes.BacBrosse.geometry} material={materials.Objet2} position={[524.004, 3353.896, 345.239]} scale={[3.863, 3.863, 2.401]} />
          <mesh name="Balais" castShadow receiveShadow geometry={nodes.Balais.geometry} material={materials.Objet3} position={[2955.482, -815.808, 339.257]} rotation={[0.023, -0.226, 0.005]} />
          <mesh name="Bouteille" castShadow receiveShadow geometry={nodes.Bouteille.geometry} material={materials.Objet3} position={[-409.219, 696.187, -153.53]} rotation={[0, 0, 1.309]} />
          <mesh name="Bouteille1" castShadow receiveShadow geometry={nodes.Bouteille1.geometry} material={materials.Objet3} position={[-388.76, -1575.56, -153.53]} />
          <mesh
            name="Bouteille2"
            castShadow
            receiveShadow
            geometry={nodes.Bouteille2.geometry}
            material={materials.Objet3}
            position={[-2202.42, -544.229, 1693.868]}
            rotation={[-1.686, -0.818, -1.168]}
          />
          <mesh name="Bouteille6" castShadow receiveShadow geometry={nodes.Bouteille6.geometry} material={materials.Objet3} position={[2084.568, -1905.242, -58.013]} />
          <mesh name="Bouteille7" castShadow receiveShadow geometry={nodes.Bouteille7.geometry} material={materials.Objet3} position={[2110.582, -1889.764, -58.013]} />
          <mesh
            name="Bouteille8"
            castShadow
            receiveShadow
            geometry={nodes.Bouteille8.geometry}
            material={materials.Objet3}
            position={[2431.766, -108.008, -34.484]}
            rotation={[0.005, -0.009, 1.024]}
          />
          <mesh
            name="Bouteille9"
            castShadow
            receiveShadow
            geometry={nodes.Bouteille9.geometry}
            material={materials.Objet3}
            position={[1653.579, -2323.469, 100.408]}
            rotation={[-0.089, -0.013, -0.341]}
          />
          <group name="Caisse">
            <mesh name="Caisse001" castShadow receiveShadow geometry={nodes.Caisse001.geometry} material={materials.Objet} position={[736.824, -157.15, 0]} />
            <mesh name="Caisse1" castShadow receiveShadow geometry={nodes.Caisse1.geometry} material={materials.Objet} position={[729.289, -280.95, 0]} />
            <mesh name="Caisse2" castShadow receiveShadow geometry={nodes.Caisse2.geometry} material={materials.Objet} />
            <mesh name="Caisse3" castShadow receiveShadow geometry={nodes.Caisse3.geometry} material={materials.Objet} />
            <mesh name="Caisse4" castShadow receiveShadow geometry={nodes.Caisse4.geometry} material={materials.Objet} />
            <mesh name="Caisse5" castShadow receiveShadow geometry={nodes.Caisse5.geometry} material={materials.Objet} />
          </group>
          <group name="CaisseArme">
            <mesh name="CaisseArme001" castShadow receiveShadow geometry={nodes.CaisseArme001.geometry} material={materials.Objet} />
            <mesh name="CaisseArme1" castShadow receiveShadow geometry={nodes.CaisseArme1.geometry} material={materials.Objet} />
            <mesh name="CaisseArme2" castShadow receiveShadow geometry={nodes.CaisseArme2.geometry} material={materials.Objet} position={[825.705, -1810.729, 0]} rotation={[0, 0, 1.472]} />
            <mesh name="CouvercleCArme" castShadow receiveShadow geometry={nodes.CouvercleCArme.geometry} material={materials.Objet} />
            <mesh name="CouvercleCArme1" castShadow receiveShadow geometry={nodes.CouvercleCArme1.geometry} material={materials.Objet} />
            <mesh name="CouvercleCArme2" castShadow receiveShadow geometry={nodes.CouvercleCArme2.geometry} material={materials.Objet} position={[825.146, -1810.054, 0]} rotation={[0, 0, 1.472]} />
            <mesh name="Fusil_assault1" castShadow receiveShadow geometry={nodes.Fusil_assault1.geometry} material={materials.Objet} />
            <mesh name="Fusil_assault2" castShadow receiveShadow geometry={nodes.Fusil_assault2.geometry} material={materials.Objet} />
            <mesh name="Fusil_assault3" castShadow receiveShadow geometry={nodes.Fusil_assault3.geometry} material={materials.Objet} />
            <mesh name="Fusil_assault4" castShadow receiveShadow geometry={nodes.Fusil_assault4.geometry} material={materials.Objet} />
            <group name="group1">
              <mesh name="Fusil_assault5" castShadow receiveShadow geometry={nodes.Fusil_assault5.geometry} material={materials.Objet} />
              <mesh name="Fusil_assault6" castShadow receiveShadow geometry={nodes.Fusil_assault6.geometry} material={materials.Objet} />
              <mesh name="Fusil_assault7" castShadow receiveShadow geometry={nodes.Fusil_assault7.geometry} material={materials.Objet} />
              <mesh name="Fusil_assault8" castShadow receiveShadow geometry={nodes.Fusil_assault8.geometry} material={materials.Objet} />
            </group>
          </group>
          <mesh name="Canapé" castShadow receiveShadow geometry={nodes.Canapé.geometry} material={materials.Objet3} position={[56.924, 1256.65, -9.15]} rotation={[0, 0, Math.PI / 2]} scale={1.057} />
          <mesh name="Canette" castShadow receiveShadow geometry={nodes.Canette.geometry} material={materials.Objet2} />
          <mesh name="Canette1" castShadow receiveShadow geometry={nodes.Canette1.geometry} material={materials.Objet2} />
          <mesh name="Canette10" castShadow receiveShadow geometry={nodes.Canette10.geometry} material={materials.Objet2} position={[-668.894, -611.748, -70.682]} rotation={[0, 0, 2.695]} />
          <mesh name="Canette2" castShadow receiveShadow geometry={nodes.Canette2.geometry} material={materials.Objet2} />
          <mesh name="Canette3" castShadow receiveShadow geometry={nodes.Canette3.geometry} material={materials.Objet2} position={[1668.888, 156.619, -70.682]} rotation={[0, 0, 0.337]} />
          <mesh name="Canette4" castShadow receiveShadow geometry={nodes.Canette4.geometry} material={materials.Objet2} position={[1676.709, 154.857, -70.682]} rotation={[0, 0, 0.337]} />
          <mesh name="Canette5" castShadow receiveShadow geometry={nodes.Canette5.geometry} material={materials.Objet2} position={[1685.892, 156.619, -70.682]} rotation={[0, 0, 0.337]} />
          <mesh name="Canette6" castShadow receiveShadow geometry={nodes.Canette6.geometry} material={materials.Objet2} position={[1693.713, 154.857, -70.682]} rotation={[0, 0, 0.337]} />
          <mesh name="Canette7" castShadow receiveShadow geometry={nodes.Canette7.geometry} material={materials.Objet2} position={[-197.452, 333.909, -70.682]} rotation={[0, 0, 1.865]} />
          <mesh name="Canette8" castShadow receiveShadow geometry={nodes.Canette8.geometry} material={materials.Objet2} position={[-164.553, 353.743, -70.682]} rotation={[0, 0, 1.865]} />
          <mesh name="Canette9" castShadow receiveShadow geometry={nodes.Canette9.geometry} material={materials.Objet2} position={[-695.742, -649.891, -70.682]} rotation={[0, 0, 2.695]} />
          <mesh name="Cendrier" castShadow receiveShadow geometry={nodes.Cendrier.geometry} material={materials.Objet2} />
          <mesh name="Cendrier1" castShadow receiveShadow geometry={nodes.Cendrier1.geometry} material={materials.Objet2} position={[1428.603, -408.101, -153.647]} scale={0.68} />
          <mesh name="Cigarette" castShadow receiveShadow geometry={nodes.Cigarette.geometry} material={materials.Objet2} />
          <mesh name="Cigarette1" castShadow receiveShadow geometry={nodes.Cigarette1.geometry} material={materials.Objet2} />
          <mesh name="Cigarette2" castShadow receiveShadow geometry={nodes.Cigarette2.geometry} material={materials.Objet2} position={[1806.013, -259.339, -135.168]} />
          <mesh name="Cigarette3" castShadow receiveShadow geometry={nodes.Cigarette3.geometry} material={materials.Objet2} position={[1806.013, -259.339, -135.168]} />
          <mesh name="Cuisine1" castShadow receiveShadow geometry={nodes.Cuisine1.geometry} material={materials.Objet3} />
          <mesh name="DoorWay1" castShadow receiveShadow geometry={nodes.DoorWay1.geometry} material={materials.Objet2} />
          <mesh name="DoorWay2" castShadow receiveShadow geometry={nodes.DoorWay2.geometry} material={materials.Objet2} />
          <mesh name="DoorWay3" castShadow receiveShadow geometry={nodes.DoorWay3.geometry} material={materials.Objet2} />
          <mesh name="DoorWay4" castShadow receiveShadow geometry={nodes.DoorWay4.geometry} material={materials.Objet2} />
          <mesh name="DoorWay5" castShadow receiveShadow geometry={nodes.DoorWay5.geometry} material={materials.Objet2} />
          <group name="Doorways" />
          <group name="Ecran">
            <mesh name="Ecran001" castShadow receiveShadow geometry={nodes.Ecran001.geometry} material={materials.Objet2} />
            <mesh
              name="Ecran1"
              castShadow
              receiveShadow
              geometry={nodes.Ecran1.geometry}
              material={materials.Objet2}
              position={[1328.596, -1003.1, -168.036]}
              rotation={[0, 0, Math.PI / 2]}
              scale={0.522}
            />
            <mesh name="Ecran2" castShadow receiveShadow geometry={nodes.Ecran2.geometry} material={materials.Objet2} position={[4.2, 0, 0]} />
            <mesh name="Ecran3" castShadow receiveShadow geometry={nodes.Ecran3.geometry} material={materials.Objet2} />
            <mesh name="Ecran4" castShadow receiveShadow geometry={nodes.Ecran4.geometry} material={materials.Objet2} />
            <mesh name="Ecran5" castShadow receiveShadow geometry={nodes.Ecran5.geometry} material={materials.Objet2} />
            <mesh
              name="Ecran6"
              castShadow
              receiveShadow
              geometry={nodes.Ecran6.geometry}
              material={materials.Objet2}
              position={[1585.786, 2258.995, 155.292]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={1.427}
            />
            <mesh
              name="Ecran7"
              castShadow
              receiveShadow
              geometry={nodes.Ecran7.geometry}
              material={materials.Objet2}
              position={[485.346, 1170.863, 321.005]}
              rotation={[0, 1.549, 0]}
              scale={[2.157, 2.692, 1.461]}
            />
          </group>
          <mesh name="FirstAidKit" castShadow receiveShadow geometry={nodes.FirstAidKit.geometry} material={materials.Objet} />
          <mesh name="FirstAidKit1" castShadow receiveShadow geometry={nodes.FirstAidKit1.geometry} material={materials.Objet} />
          <group name="FirstAidKits" />
          <mesh name="Fusil_assault" castShadow receiveShadow geometry={nodes.Fusil_assault.geometry} material={materials.Objet} />
          <mesh
            name="Fusil_assault10"
            castShadow
            receiveShadow
            geometry={nodes.Fusil_assault10.geometry}
            material={materials.Objet}
            position={[-543.088, -953.062, -1519.784]}
            rotation={[-2.453, 1.564, 1.868]}
          />
          <mesh
            name="Fusil_assault11"
            castShadow
            receiveShadow
            geometry={nodes.Fusil_assault11.geometry}
            material={materials.Objet}
            position={[-542.317, -1028.551, -1519.784]}
            rotation={[-2.453, 1.564, 1.868]}
          />
          <mesh
            name="Fusil_assault9"
            castShadow
            receiveShadow
            geometry={nodes.Fusil_assault9.geometry}
            material={materials.Objet}
            position={[-543.088, -890.022, -1519.784]}
            rotation={[-2.453, 1.564, 1.868]}
          />
          <group name="group" position={[-1810.022, 306.882, 3.162]} rotation={[0, 0, -Math.PI / 2]} scale={31.836}>
            <group name="CoffreCoffreScifi">
              <mesh name="CoffreCoffre" castShadow receiveShadow geometry={nodes.CoffreCoffre.geometry} material={materials['Coffre:Texture']} />
              <mesh name="CoffrePorteBas" castShadow receiveShadow geometry={nodes.CoffrePorteBas.geometry} material={materials['Coffre:Texture']} position={[0, -0.117, 0]} />
              <mesh name="CoffrePorteHaut" castShadow receiveShadow geometry={nodes.CoffrePorteHaut.geometry} material={materials['Coffre:Texture']} position={[0, -0.116, 0]} />
              <mesh name="CoffreSerruredroite" castShadow receiveShadow geometry={nodes.CoffreSerruredroite.geometry} material={materials['Coffre:Texture']} />
              <mesh
                name="CoffreSerrureGauche"
                castShadow
                receiveShadow
                geometry={nodes.CoffreSerrureGauche.geometry}
                material={materials['Coffre:Texture']}
                position={[-0.032, 4.139, 0]}
                rotation={[0, 0, -3.059]}
              />
            </group>
          </group>
          <group name="group2" position={[1237.877, -2015.641, 900.279]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
            <mesh
              name="Photo"
              castShadow
              receiveShadow
              geometry={nodes.Photo.geometry}
              material={materials.Objet3}
              position={[390.141, -1081.972, -142.325]}
              rotation={[0, 0, -2.234]}
              scale={[0.33, 0.409, 0.406]}
            />
            <mesh name="Photo5" castShadow receiveShadow geometry={nodes.Photo5.geometry} material={materials.Objet3} position={[1816.565, -1818.355, -142.326]} scale={[0.439, 0.525, 0.525]} />
          </group>
          <group name="group3" position={[-413.787, -549.828, 0]} rotation={[0, 0, -0.703]}>
            <mesh name="Photo1" castShadow receiveShadow geometry={nodes.Photo1.geometry} material={materials.Objet3} position={[-322.082, -542.967, -121.282]} scale={[0.468, 0.583, 0.756]} />
            <mesh name="Photo10" castShadow receiveShadow geometry={nodes.Photo10.geometry} material={materials.Objet3} position={[-284.913, -542.967, -121.282]} scale={[0.468, 0.583, 0.756]} />
          </group>
          <mesh name="HoloSupport" castShadow receiveShadow geometry={nodes.HoloSupport.geometry} material={materials.Objet}>
            <mesh name="Globe" castShadow receiveShadow geometry={nodes.Globe.geometry} material={materials.Objet} />
          </mesh>
          <group name="Lampe">
            <group name="group4" position={[-729.757, 0, 157.794]} rotation={[0, -1.571, 0]}>
              <mesh name="Neon" castShadow receiveShadow geometry={nodes.Neon.geometry} material={materials.Objet} />
              <mesh name="Neon1" castShadow receiveShadow geometry={nodes.Neon1.geometry} material={materials.Objet} />
            </group>
            <mesh name="Neon10" castShadow receiveShadow geometry={nodes.Neon10.geometry} material={materials.Objet} />
            <mesh name="Neon11" castShadow receiveShadow geometry={nodes.Neon11.geometry} material={materials.Objet} />
            <mesh name="Neon12" castShadow receiveShadow geometry={nodes.Neon12.geometry} material={materials.Objet} />
            <mesh name="Neon13" castShadow receiveShadow geometry={nodes.Neon13.geometry} material={materials.Objet} />
            <mesh
              name="Neon14"
              castShadow
              receiveShadow
              geometry={nodes.Neon14.geometry}
              material={materials.Objet}
              position={[562.946, 992.843, 333.821]}
              rotation={[-Math.PI / 2, 0.935, 0]}
              scale={[1, 0.514, 1]}
            />
            <mesh
              name="Neon3"
              castShadow
              receiveShadow
              geometry={nodes.Neon3.geometry}
              material={materials.Objet}
              position={[-572.35, 986.012, 333.821]}
              rotation={[-Math.PI / 2, -0.95, 0]}
              scale={[1, 0.514, 1]}
            />
            <mesh name="Neon5" castShadow receiveShadow geometry={nodes.Neon5.geometry} material={materials.Objet} />
            <mesh name="Neon6" castShadow receiveShadow geometry={nodes.Neon6.geometry} material={materials.Objet} />
            <mesh name="Neon7" castShadow receiveShadow geometry={nodes.Neon7.geometry} material={materials.Objet} />
            <mesh name="Neon8" castShadow receiveShadow geometry={nodes.Neon8.geometry} material={materials.Objet} />
            <mesh name="Neon9" castShadow receiveShadow geometry={nodes.Neon9.geometry} material={materials.Objet} />
          </group>
          <mesh name="LampeALerte" castShadow receiveShadow geometry={nodes.LampeALerte.geometry} material={materials.Objet2} position={[-444.767, -1492.008, -176.445]} scale={0.678} />
          <group name="Lit">
            <mesh name="Coussin003" castShadow receiveShadow geometry={nodes.Coussin003.geometry} material={materials.Objet2} />
            <mesh name="Couverture003" castShadow receiveShadow geometry={nodes.Couverture003.geometry} material={materials.Objet2} />
          </group>
          <group name="Lit1">
            <mesh name="Coussin002" castShadow receiveShadow geometry={nodes.Coussin002.geometry} material={materials.Objet2} />
            <mesh name="Couverture002" castShadow receiveShadow geometry={nodes.Couverture002.geometry} material={materials.Objet2} />
          </group>
          <group name="Lit2">
            <mesh name="Coussin001" castShadow receiveShadow geometry={nodes.Coussin001.geometry} material={materials.Objet2} />
            <mesh name="Couverture001" castShadow receiveShadow geometry={nodes.Couverture001.geometry} material={materials.Objet2} />
          </group>
          <group name="Lit3">
            <mesh name="Coussin" castShadow receiveShadow geometry={nodes.Coussin.geometry} material={materials.Objet2} />
            <mesh name="Couverture" castShadow receiveShadow geometry={nodes.Couverture.geometry} material={materials.Objet2} />
          </group>
          <mesh name="Minibar" castShadow receiveShadow geometry={nodes.Minibar.geometry} material={materials.Objet3} position={[-756.268, 256.67, -44.741]} rotation={[0, 0, Math.PI]} />
          <mesh name="Panneau_control" castShadow receiveShadow geometry={nodes.Panneau_control.geometry} material={materials.Objet2} />
          <mesh name="PaquetCiga" castShadow receiveShadow geometry={nodes.PaquetCiga.geometry} material={materials.Objet2} />
          <mesh
            name="PaquetCiga1"
            castShadow
            receiveShadow
            geometry={nodes.PaquetCiga1.geometry}
            material={materials.Objet2}
            position={[550.931, 17.966, -157.239]}
            rotation={[-0.033, 0.082, 0.658]}
            scale={0.895}
          />
          <mesh
            name="Photo2"
            castShadow
            receiveShadow
            geometry={nodes.Photo2.geometry}
            material={materials.Objet3}
            position={[12.188, 422.654, -5222.411]}
            rotation={[-Math.PI / 2, 0, 2.06]}
            scale={2.572}
          />
          <mesh
            name="Photo3"
            castShadow
            receiveShadow
            geometry={nodes.Photo3.geometry}
            material={materials.Objet3}
            position={[86.105, -1399.363, -589.416]}
            rotation={[2.064, -Math.PI / 2, 0]}
            scale={0.236}
          />
          <mesh
            name="Photo4"
            castShadow
            receiveShadow
            geometry={nodes.Photo4.geometry}
            material={materials.Objet3}
            position={[1671.624, -1358.437, -1226.693]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.741}
          />
          <mesh
            name="Photo6"
            castShadow
            receiveShadow
            geometry={nodes.Photo6.geometry}
            material={materials.Objet3}
            position={[-1890.771, 3106.979, -3428.277]}
            rotation={[Math.PI, -1.571, 0]}
            scale={2.212}
          />
          <mesh
            name="Photo7"
            castShadow
            receiveShadow
            geometry={nodes.Photo7.geometry}
            material={materials.Objet3}
            position={[-311.194, -4427.077, -4607.858]}
            rotation={[0, 1.571, 0]}
            scale={3.057}
          />
          <mesh name="Photo9" castShadow receiveShadow geometry={nodes.Photo9.geometry} material={materials.Objet3} position={[591.761, -2260.66, -3332.368]} rotation={[0, 1.571, 0]} scale={2.159} />
          <mesh name="Pistolet" castShadow receiveShadow geometry={nodes.Pistolet.geometry} material={materials.Objet3} position={[-585.47, -1624.703, -1658.236]} rotation={[0, 1.571, 0]} />
          <mesh name="Pistolet2" castShadow receiveShadow geometry={nodes.Pistolet2.geometry} material={materials.Objet3} position={[1530.801, 109.004, -204.948]} rotation={[0.026, 0.064, 1.186]} />
          <mesh name="Pizza" castShadow receiveShadow geometry={nodes.Pizza.geometry} material={materials.Objet3} position={[-2372.319, -2323.481, -234.206]} rotation={[0.023, -0.065, -1.229]} />
          <mesh name="PlateauRepas" castShadow receiveShadow geometry={nodes.PlateauRepas.geometry} material={materials.Objet3} position={[-1397.788, -2416.823, -150.93]} rotation={[0, 0, -0.709]} />
          <mesh
            name="pPlane1"
            castShadow
            receiveShadow
            geometry={nodes.pPlane1.geometry}
            material={materials.Objet3}
            position={[-444.906, -940.893, -191.664]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2.291, 4.043, 1.019]}
          />
          <mesh name="Robinet1" castShadow receiveShadow geometry={nodes.Robinet1.geometry} material={materials.Objet3} position={[1423.397, -1571.941, 0]} />
          <mesh name="Room_Room" castShadow receiveShadow geometry={nodes.Room_Room.geometry} material={materials.Room1} />
          <mesh name="Safe1" castShadow receiveShadow geometry={nodes.Safe1.geometry} material={materials.Objet3} position={[534.341, -695.708, 0]} />
          <mesh name="Safe2" castShadow receiveShadow geometry={nodes.Safe2.geometry} material={materials.Objet3} position={[534.341, -561.459, 0]} />
          <group name="Sofa">
            <mesh name="Sofa001" castShadow receiveShadow geometry={nodes.Sofa001.geometry} material={materials.Objet} position={[-696.603, 710.771, 0]} rotation={[0, 0, 0.787]} />
          </group>
          <mesh
            name="SupportArme"
            castShadow
            receiveShadow
            geometry={nodes.SupportArme.geometry}
            material={materials.Objet3}
            position={[-1981.255, -2963.96, -134.095]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={1.44}
          />
          <mesh
            name="SupportArme1"
            castShadow
            receiveShadow
            geometry={nodes.SupportArme1.geometry}
            material={materials.Objet3}
            position={[-1981.255, -3101.901, -134.095]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={1.44}
          />
          <group name="Table" position={[123.465, -119.04, 0]}>
            <mesh
              name="Argent"
              castShadow
              receiveShadow
              geometry={nodes.Argent.geometry}
              material={materials.Objet3}
              position={[-484.212, 737.951, -304.644]}
              rotation={[0, 0.182, 1.184]}
              scale={0.603}
            />
            <mesh name="Argent1" castShadow receiveShadow geometry={nodes.Argent1.geometry} material={materials.Objet3} position={[-562.986, -586.824, -112.655]} scale={0.603} />
            <mesh
              name="Bouteille3"
              castShadow
              receiveShadow
              geometry={nodes.Bouteille3.geometry}
              material={materials.Objet3}
              position={[-1233.877, -1690.344, -143.501]}
              rotation={[0.005, -0.009, -0.633]}
            />
            <mesh
              name="Bouteille4"
              castShadow
              receiveShadow
              geometry={nodes.Bouteille4.geometry}
              material={materials.Objet3}
              position={[-1257.307, -1674.948, -143.501]}
              rotation={[0.005, -0.009, -0.633]}
            />
            <mesh
              name="Bouteille5"
              castShadow
              receiveShadow
              geometry={nodes.Bouteille5.geometry}
              material={materials.Objet3}
              position={[-1202.441, -1668.49, -143.501]}
              rotation={[0.005, -0.009, -0.633]}
            />
            <mesh name="HoloSupport_mission" castShadow receiveShadow geometry={nodes.HoloSupport_mission.geometry} material={materials.Objet}>
              <mesh name="MissionHolo" castShadow receiveShadow geometry={nodes.MissionHolo.geometry} material={materials.Objet3} position={[0, -1.741, 0]} />
              <mesh name="MissionHolo1" castShadow receiveShadow geometry={nodes.MissionHolo1.geometry} material={materials.Objet3} position={[0, 2.756, 0]} />
            </mesh>
            <mesh name="Pistolet1" castShadow receiveShadow geometry={nodes.Pistolet1.geometry} material={materials.Objet3} position={[144.481, 1085.492, -130.208]} rotation={[0, 0, 1.186]} />
            <mesh
              name="PlateauRepas1"
              castShadow
              receiveShadow
              geometry={nodes.PlateauRepas1.geometry}
              material={materials.Objet3}
              position={[-3467.733, -777.487, -134.212]}
              rotation={[0, 0, -2.033]}
            />
            <mesh name="Table001" castShadow receiveShadow geometry={nodes.Table001.geometry} material={materials.Objet} />
            <mesh name="Tablette2" castShadow receiveShadow geometry={nodes.Tablette2.geometry} material={materials.Objet2} position={[121.922, 0, 0]} />
            <mesh name="Tabouret001" castShadow receiveShadow geometry={nodes.Tabouret001.geometry} material={materials.Objet} />
            <mesh name="Tabouret1" castShadow receiveShadow geometry={nodes.Tabouret1.geometry} material={materials.Objet} />
            <mesh name="Tabouret2" castShadow receiveShadow geometry={nodes.Tabouret2.geometry} material={materials.Objet} />
            <mesh name="Tabouret3" castShadow receiveShadow geometry={nodes.Tabouret3.geometry} material={materials.Objet} />
            <mesh name="Tabouret4" castShadow receiveShadow geometry={nodes.Tabouret4.geometry} material={materials.Objet} />
            <mesh name="verre2" castShadow receiveShadow geometry={nodes.verre2.geometry} material={materials.Objet2} position={[-373.72, 32.87, -38.889]} scale={0.692} />
            <mesh
              name="verre3"
              castShadow
              receiveShadow
              geometry={nodes.verre3.geometry}
              material={materials.Objet2}
              position={[-1204.781, 542.037, 853.375]}
              rotation={[-1.537, -0.814, -1.057]}
              scale={0.692}
            />
          </group>
          <group name="Tables">
            <mesh name="TableBasse" castShadow receiveShadow geometry={nodes.TableBasse.geometry} material={materials.Objet} />
            <mesh name="TableBasse1" castShadow receiveShadow geometry={nodes.TableBasse1.geometry} material={materials.Objet} position={[2225.546, -494.244, 0.312]} scale={[1.134, 0.526, 1.694]} />
          </group>
          <group name="Tablette">
            <mesh name="Tablette001" castShadow receiveShadow geometry={nodes.Tablette001.geometry} material={materials.Objet2} />
            <mesh name="Tablette3" castShadow receiveShadow geometry={nodes.Tablette3.geometry} material={materials.Objet2} />
            <mesh name="Tablette4" castShadow receiveShadow geometry={nodes.Tablette4.geometry} material={materials.Objet2} />
          </group>
          <group name="Tabouret" />
          <group name="Tiroirs" position={[-161.555, 1227.782, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <mesh name="Tiroir" castShadow receiveShadow geometry={nodes.Tiroir.geometry} material={materials.Objet} position={[1482.775, 333.336, 0]} />
            <mesh name="Tiroir1" castShadow receiveShadow geometry={nodes.Tiroir1.geometry} material={materials.Objet} position={[1482.775, 333.336, 0]} />
            <mesh name="Tiroir2" castShadow receiveShadow geometry={nodes.Tiroir2.geometry} material={materials.Objet} position={[1482.775, 333.336, 0]} />
            <mesh name="Tiroir3" castShadow receiveShadow geometry={nodes.Tiroir3.geometry} material={materials.Objet} position={[1482.775, 333.336, 0]} />
            <mesh name="Tiroir4" castShadow receiveShadow geometry={nodes.Tiroir4.geometry} material={materials.Objet} position={[1227.112, 33.612, 0]} rotation={[0, 0, Math.PI / 2]} />
            <mesh name="Tiroir5" castShadow receiveShadow geometry={nodes.Tiroir5.geometry} material={materials.Objet} position={[1227.112, -58.54, 0]} rotation={[0, 0, Math.PI / 2]} />
          </group>
          <mesh name="Tuyau" castShadow receiveShadow geometry={nodes.Tuyau.geometry} material={materials.Objet2} />
          <mesh name="Tuyau1" castShadow receiveShadow geometry={nodes.Tuyau1.geometry} material={materials.Objet2} />
          <mesh name="Tuyau2" castShadow receiveShadow geometry={nodes.Tuyau2.geometry} material={materials.Objet2} />
          <mesh name="Tuyau3" castShadow receiveShadow geometry={nodes.Tuyau3.geometry} material={materials.Objet2} />
          <mesh
            name="Tuyau4"
            castShadow
            receiveShadow
            geometry={nodes.Tuyau4.geometry}
            material={materials.Objet2}
            position={[-1739.152, -760.195, -10.733]}
            rotation={[0, 0.066, 0]}
            scale={[0.623, 0.616, 0.923]}
          />
          <mesh
            name="Tuyau5"
            castShadow
            receiveShadow
            geometry={nodes.Tuyau5.geometry}
            material={materials.Objet2}
            position={[-312.099, -627.828, -738.866]}
            rotation={[0.916, -1.523, -0.655]}
            scale={[0.611, 0.449, 0.88]}
          />
          <mesh
            name="Tuyau6"
            castShadow
            receiveShadow
            geometry={nodes.Tuyau6.geometry}
            material={materials.Objet2}
            position={[741.695, -72.736, -21.227]}
            rotation={[-3.11, -0.079, 2.894]}
            scale={[0.611, 0.449, 0.88]}
          />
          <group name="VerreBrosse">
            <mesh name="Brosseadent" castShadow receiveShadow geometry={nodes.Brosseadent.geometry} material={materials.Objet2} />
            <mesh name="Brosseadent1" castShadow receiveShadow geometry={nodes.Brosseadent1.geometry} material={materials.Objet2} />
            <mesh name="Verre1" castShadow receiveShadow geometry={nodes.Verre1.geometry} material={materials.Objet2} />
          </group>
          <mesh name="WetFloor" castShadow receiveShadow geometry={nodes.WetFloor.geometry} material={materials.Objet3} position={[3245.172, 1102.939, -18.946]} rotation={[0, 0, 0.962]} />
        </group>
        <group name="Robot" position={[-4.253, 0.839, -15.293]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh name="Bras" castShadow receiveShadow geometry={nodes.Bras.geometry} material={materials.Robot1} />
          <mesh name="Robot001" castShadow receiveShadow geometry={nodes.Robot001.geometry} material={materials.Robot1} />
        </group>
        <group name="Fumercig" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh name="Fumer" castShadow receiveShadow geometry={nodes.Fumer.geometry} material={materials.Objet3} />
        </group>
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/models/interiors/spaceship_interiors/ShipInteriors.glb')

export default PrivateQuarters
