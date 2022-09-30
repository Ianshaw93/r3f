import * as THREE from 'three'; 
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Detailed } from '@react-three/drei'

function Heart({ z }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0 ,0 , z])

  const { nodes, materials } = useGLTF('/heart-transformed.glb')

  const [data] = useState({
    // populate in circular shape
    // in sphere shape
    // x: Math.random() *3, 
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  })

  const deltaY = 0.01;
  const radius = Math.max( width, height );

  const deltaAngle = findDeltaAngle(deltaY, radius)
  let angle = 0


  function findDeltaAngle(delta, radius) {
    return delta / radius
  }


  useFrame(() => {
    angle += deltaAngle;
    

    ref.current.position.set(data.x * width + radius*Math.cos(angle), (data.y + radius*Math.sin(angle)), z)

  })

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh 
        ref={ref} 
        geometry={nodes.Vert_0.geometry} 
        material={materials['Scene_-_Root']} 
        />
    </group>
  )
}


export default function App({ count = 10 }) {
  return (
    <>
       <div className="bg" />
      <h1>
        MALIGAYANG
        <br />
        <span>BATI</span>
        <br />
        <span>AVERY</span>
      </h1>
      <Canvas>
        {/* <ambientLight intensity={0.75} /> */}
        <pointLight intensity={0.75}  />
        <Suspense fallback={null} >
          <OrbitControls autoRotate autoRotateSpeed={5} /> 
          {/* <Heart />    */}
          {Array.from({ length: count }, (_, i) => (<Heart key={i} z={-i} />))}
        </Suspense>
      </Canvas>
    </>

  )
}


