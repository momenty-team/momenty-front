'use client';

import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CustomControls from './customControl';
import { useSearchParams } from 'next/navigation';
import { randomInt } from 'crypto';

export const CAT_STATE = [
  'Health',
  'Stress',
  'Soso',
  'Base',
  'Peaceful',
  'Rest',
  'Energy',
  'Good rest',
  'Stretching',
  'Little tired',
  'Tired',
  'Lazy',
  'Lethargy',
  'Energy',
] as const;

interface catStateResponse {
  result: (typeof CAT_STATE)[number];
}

const DEFAULT_POSITION: Position = {
  field: [0, -1.8, 0],
  target: [0, 1.2, 0],
  camera: [0.4, 1, 1],
};
interface AnimationProps {
  animations: THREE.AnimationClip[];
  group: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
  actionRef: React.MutableRefObject<THREE.AnimationAction | null>;
  healthKitData?: string;
  changePosition: (position: Position) => void;
  changeModelVisibility: (state: boolean) => void;
}

const Animation = ({
  animations,
  group,
  actionRef,
  healthKitData,
  changePosition,
  changeModelVisibility,
}: AnimationProps) => {
  const { actions } = useAnimations(animations, group);
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const day = searchParams.get('day');

  useEffect(() => {
    if (healthKitData) {
      changeModelVisibility(false);
      const fetchRecords = async (healthKitData: string) => {
        const res = await fetch(`/api/characters/status?year=${year}&month=${month}&day=${day}`, {
          method: 'POST',
          body: JSON.stringify({ healthKitData }),
        });

        if (!res.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');

        const { result: catState }: catStateResponse = await res.json();

        if (actions && actions[catState]) {
          actionRef.current = actions[catState];
          actionRef.current.timeScale = 1.6;
          actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
          actionRef.current.clampWhenFinished = true;

          if (catState === 'Rest') {
            changePosition({
              field: [-0.8, -0.6, 0],
              target: [0, 1.2, 0],
              camera: [-0.4, 1, 1],
            });
          } else if (catState === 'Lazy') {
            changePosition({
              field: [-1, -0.6, 0],
              target: [0, 1, 0],
              camera: [0, 2, 0],
            });
          } else {
            changePosition(DEFAULT_POSITION);
          }

          actionRef.current.reset().play();
          changeModelVisibility(true);
        }
      };

      fetchRecords(healthKitData);
    }
  }, [actions, healthKitData]);

  return <></>;
};

interface Position {
  field: [number, number, number];
  target: [number, number, number];
  camera: [number, number, number];
}

interface CatModelViewerProps {
  healthKitData?: string;
}

function CatModelViewer({ healthKitData }: CatModelViewerProps) {
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/model/cat.glb');
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [show, setShow] = useState(false);

  scene.position.set(0, 0, 0);

  const handlePositionChange = (position: Position) => {
    setPosition(position);
  };

  const changeModelVisibility = (state: boolean) => {
    setShow(state);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
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
        <CustomControls
          key={position.camera.join(',')}
          cameraPosition={position.camera}
          targetPosition={position.target}
        />
        {/* <gridHelper args={[10, 10, 'white', 'gray']} /> */}
        <group ref={group} position={position.field}>
          <primitive object={scene} />
        </group>
        <Animation
          animations={animations}
          group={group}
          actionRef={actionRef}
          healthKitData={healthKitData}
          changePosition={handlePositionChange}
          changeModelVisibility={changeModelVisibility}
        />
      </Canvas>
    </div>
  );
}

export default CatModelViewer;
