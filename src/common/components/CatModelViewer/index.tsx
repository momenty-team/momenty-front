'use client';

import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CustomControls from './customControl';

const CAT_STATE = ['Health', 'Stress', 'Soso', 'Base', 'Peaceful', 'Rest', 'Energy'];

interface AnimationProps {
  animations: THREE.AnimationClip[];
  group: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  actionRef: React.MutableRefObject<THREE.AnimationAction | null>;
}

const Animation = ({ animations, group, actionRef }: AnimationProps) => {
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions['Peaceful']) {
      actionRef.current = actions['Peaceful'];
      actionRef.current.timeScale = 1.6;
      actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
      actionRef.current.clampWhenFinished = true;
    }
  }, [actions]);

  return <></>;
};

const CatModelViewer = () => {
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/model/cat.glb');

  scene.position.set(0, 0, 0);

  const handleClick = () => {
    if (actionRef.current) {
      actionRef.current.reset().play();
    }
  };

  return (
    <div style={{ width: '100%', height: '240px' }}>
      <Canvas
        onCreated={({ gl, camera }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            console.warn('WebGL context lost:', event);
          });

          camera.lookAt(0, 1, 0);
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[0.19, 7.39, 3.3]} />
        <CustomControls />
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
