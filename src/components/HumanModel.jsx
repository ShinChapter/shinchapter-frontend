import React from 'react';
import { useGLTF } from '@react-three/drei';

const HumanModel = ({ url, position }) => {
    const { scene } = useGLTF(url);

    return (
        <primitive
            object={scene}
            position={position} // [x, y, z] 형태
        />
    )
}

export default HumanModel
