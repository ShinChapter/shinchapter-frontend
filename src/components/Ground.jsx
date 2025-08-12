import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Ground({ y = -0.02, size = 2000, registerCollider }) {
  const ref = useRef(null);
  const { gl } = useThree();

const texture = useTexture('/concrete.png'); 

  useEffect(() => {
    if (ref.current && registerCollider) registerCollider(ref.current);
  }, [registerCollider]);

  useEffect(() => {
    if (!texture) return;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(size / 20, size / 20);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  }, [texture, size, gl]);

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
  );
}
