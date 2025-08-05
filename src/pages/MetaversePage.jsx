import React, { Suspense, useState } from 'react';
import * as S from './MetaversePage.styled';
import Header from './../components/Header';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei'
import { Model } from './Sswu';
import PlayerControls from '../components/PlayerControls';
import * as THREE from 'three';
import { Physics, RigidBody } from '@react-three/rapier';
import Camera from '../assets/icons/camera2.png';
import Change from '../assets/icons/change.png';
import Up from '../assets/icons/up.png';
import MiniSungshin from '../assets/images/mini-sungshin.png';
import MiniSoojung from '../assets/images/mini-soojung.png';
import MiniLibrary from '../assets/images/mini-library.png';

const BUILDING_POSITIONS = {
    성신관: new THREE.Vector3(-2.21, 1.50, -12.00),
    수정관: new THREE.Vector3(-2.19, 1.50, -14.28),
    도서관: new THREE.Vector3(1.71, 0.16, -3.60),
}
const BUILDING_IMAGES = {
    성신관: MiniSungshin,
    수정관: MiniSoojung,
    도서관: MiniLibrary,
}

const MetaversePage = () => {
    const [moveTo, setMoveTo] = useState(null);
    const [showBuildings, setShowBuildings] = useState(false);

    return (
        <S.Wrapper>
            <Header />
            <S.IconWrapper>
                <S.CameraIcon src={Camera}/>
                {/* Change 아이콘 */}
                {!showBuildings && (
                    <S.ChangeIcon
                        src={Change}
                        alt="Change"
                        onClick={() => setShowBuildings(true)}
                        title="Change"
                    />
                )}

                {/* 건물 이미지 + Up 아이콘 */}
                {showBuildings && (
                    <S.BuildingIconWrapper>
                        {/* Up 아이콘 */}
                        <S.UpIcon
                            src={Up}
                            alt="Up"
                            onClick={() => setShowBuildings(false)}
                            title="Up"
                        />
                        {Object.keys(BUILDING_POSITIONS).map((building) => (
                            <S.BuildingIcon
                                key={building}
                                src={BUILDING_IMAGES[building]}
                                alt={building}
                                onClick={() => setMoveTo(BUILDING_POSITIONS[building].clone())}
                                title={building}
                            />
                        ))}
                    </S.BuildingIconWrapper>
                )}
            </S.IconWrapper>

            {/* 3D */}
            <Canvas camera={{ position: [0, 10, 30], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} />
                    <Physics>
                        <Model />
                        <RigidBody type="fixed" colliders="cuboid">
                            <mesh position={[0, 0, 0]} scale={[100, 1, 100]}>
                                <boxGeometry />
                                <meshStandardMaterial visible={false} />
                            </mesh>
                        </RigidBody>
                        <PlayerControls moveTo={moveTo} setMoveTo={setMoveTo} />
                    </Physics>
                    <PointerLockControls />
                </Suspense>
            </Canvas>
        </S.Wrapper>
    )
}

export default MetaversePage;
