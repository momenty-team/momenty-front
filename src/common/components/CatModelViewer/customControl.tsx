'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CustomControlsProps {
  targetPosition: [number, number, number];
  cameraPosition: [number, number, number];
}

const CustomControls = ({ cameraPosition, targetPosition }: CustomControlsProps) => {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  const isInteracting = useRef(false);
  const [cameraX, cameraY, cameraZ] = cameraPosition;
  const [targetX, targetY, targetZ] = targetPosition;
  const initialTarget = useRef<THREE.Vector3>(new THREE.Vector3(targetX, targetY, targetZ));
  const cameraStartPosition = new THREE.Vector3(cameraX, cameraY, cameraZ);
  const initialQuaternion = useRef(
    new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(cameraStartPosition, initialTarget.current, new THREE.Vector3(0, 1, 0))
    )
  );

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isInteracting.current = true;
    };
    const handleEnd = () => {
      isInteracting.current = false;
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, []);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || isInteracting.current) return;

    camera.quaternion.slerp(initialQuaternion.current, 0.08);

    const distance = camera.position.distanceTo(controls.target);
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const newPosition = new THREE.Vector3().copy(controls.target).addScaledVector(direction, -distance);
    camera.position.copy(newPosition);

    controls.target.lerp(initialTarget.current, 0.08);

    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 1, 0]}
      enableZoom={false}
      enablePan={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0.3}
    />
  );
};

export default CustomControls;
