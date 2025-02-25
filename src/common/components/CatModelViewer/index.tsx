'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimationProps {
  animations: THREE.AnimationClip[];
  group: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  actionRef: React.MutableRefObject<THREE.AnimationAction | null>;
}

const Animation = ({ animations, group, actionRef }: AnimationProps) => {
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions['xyrotation']) {
      actionRef.current = actions['xyrotation'];
      actionRef.current.setLoop(THREE.LoopOnce, 1);
      actionRef.current.clampWhenFinished = true;
    }
  }, [actions]);

  return <></>;
};

const CatModelViewer = () => {
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/model/cat_modeling16.glb');

  const handleClick = () => {
    if (actionRef.current) {
      actionRef.current.reset().play();
    }
  };

  return (
    <div style={{ width: '100%', height: '240px' }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            console.warn('WebGL context lost:', event);
          });
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[0.19, 7.39, 3.3]} />
        <OrbitControls />
        <group ref={group}>
          <primitive object={scene} />
        </group>
        <Animation animations={animations} group={group} actionRef={actionRef} />
      </Canvas>
      <button
        style={{
          position: 'absolute',
          top: '380px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
        onClick={handleClick}
      >
        hi 애니메이션 실행
      </button>
    </div>
  );
};

export default CatModelViewer;
