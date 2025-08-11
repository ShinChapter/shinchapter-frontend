import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const UniversityModel = ({ onLoaded }) => {
    const { scene } = useGLTF('/sswu.glb');

    useEffect(() => {
        if (!scene) return;
        const meshes = [];
        scene.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                meshes.push(o);
            }
        });
        onLoaded?.(meshes);
    }, [scene, onLoaded]);
    
    useGLTF.preload('/sswu.glb');

    return <primitive object={scene} />;
}

export default UniversityModel
