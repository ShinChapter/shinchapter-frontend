import React, { Suspense, useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useGLTF, Sky, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Ground = ({ y = -0.02, size = 2000, registerCollider }) => {
    const ref = useRef(null);
    const { gl } = useThree();
    const texture = useTexture('/concrete.png');

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(size / 20, size / 20);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();

    useEffect(() => {
        if (ref.current && registerCollider) registerCollider(ref.current);
    }, [registerCollider]);

    return (
        <mesh
            ref={ref}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, y, 0]}
            receiveShadow
        >
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

export default Ground
