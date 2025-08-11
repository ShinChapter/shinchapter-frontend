import React, { Suspense, useCallback, useState } from 'react';
import * as S from './MetaversePage.styled';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import Camera from '../assets/icons/camera2.png';
import NoCamera from '../assets/icons/no-camera.png';
import Change from '../assets/icons/change.png';
import Up from '../assets/icons/up.png';
import MiniSungshin from '../assets/images/mini-sungshin.png';
import MiniSoojung from '../assets/images/mini-soojung.png';
import MiniLibrary from '../assets/images/mini-library.png';
import Header from '../components/Header';
import Button from '../components/Button';
import Ground from '../components/Ground';
import UniversityModel from '../components/UniversityModel';
import Movement from './../components/Movement';

const BUILDING_TARGETS = {
    성신관: {
        position: new THREE.Vector3(-36.95, 28.47, -121.53),
        lookAt: new THREE.Vector3(-37.95, 28.53, -121.52),
    },
    수정관: {
        position: new THREE.Vector3(-20.74, 28.47, -156.85),
        lookAt: new THREE.Vector3(-20.74, 28.46, -157.85),
    },
    도서관: {
        position: new THREE.Vector3(26.74, 18.32, -37.85),
        lookAt: new THREE.Vector3(27.67, 18.41, -38.22),
    },
};

const BUILDING_IMAGES = {
    성신관: MiniSungshin,
    수정관: MiniSoojung,
    도서관: MiniLibrary,
};

const MetaversePage = () => {
    const [colliders, setColliders] = useState([]);
    const onLoaded = useCallback((meshes) => setColliders(meshes), []);
    const registerCollider = useCallback((obj) => {
        if (!obj) return;
            setColliders(prev => (prev.includes(obj) ? prev : [...prev, obj]));
    }, []);
    
    const [moveTo, setMoveTo] = useState(null);
    const [showBuildings, setShowBuildings] = useState(false);
    const [location, setLocation] = useState("성신여자대학교 정문");
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <Header />
            <S.IconWrapper>
                <S.LocationWrapper>
                    <S.BlurLayer />
                    <S.Location>{location}</S.Location>
                </S.LocationWrapper>
                <S.CameraIcon
                    src={location!=="성신여자대학교 안" ? Camera : NoCamera}
                    onClick={location!=="성신여자대학교 안" ? () => navigate('/metaverse/camera') : undefined}
                    style={{ cursor: location!=="성신여자대학교 안" ? "pointer" : "default" }}
                />
                {/* Change 아이콘 */}
                {!showBuildings && (
                    <S.Icon
                        src={Change}
                        alt="Change"
                        onClick={() => setShowBuildings(true)}
                        title="Change"
                    />
                )}

                {/* 건물 이미지 + Up 아이콘 */}
                {showBuildings && (
                    <S.DropdownIconWrapper>
                        {/* Up 아이콘 */}
                        <S.UpIcon
                            src={Up}
                            alt="Up"
                            onClick={() => setShowBuildings(false)}
                            title="Up"
                        />
                        {Object.keys(BUILDING_TARGETS).map((building) => (
                            <S.BuildingIcon
                                key={building}
                                src={BUILDING_IMAGES[building]}
                                alt={building}
                                onClick={() => setMoveTo({
                                    position: BUILDING_TARGETS[building].position.clone(),
                                    lookAt: BUILDING_TARGETS[building].lookAt.clone()
                                })}
                                title={building}
                            />
                        ))}
                    </S.DropdownIconWrapper>
                )}
            </S.IconWrapper>

            {/* 3D */}
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 4, 15], fov: 60, near: 0.3, far: 600 }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    alpha: false,
                    logarithmicDepthBuffer: true
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#0b0f14');
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
            >
                {/* 하늘과 안개 */}
                <fog attach="fog" args={['#6e81a4ff', 80, 1600]} />
                <Sky distance={450000} sunPosition={[100, 200, 100]} turbidity={6} rayleigh={2} />
                <Environment preset="city" />
                {/* 라이트 */}
                <hemisphereLight intensity={0.6} />
                <directionalLight position={[10, 15, 5]} intensity={1.4} castShadow />
                {/* 바닥 */}
                <Ground y={0} size={4000} registerCollider={registerCollider} />
                {/* 모델 */}
                <Suspense fallback={null}>
                    <UniversityModel onLoaded={onLoaded} />
                </Suspense>
                {/* 이동 */}
                <Movement
                    colliders={colliders}
                    speed={6}
                    eyeHeight={8.0}
                    maxSlopeDeg={50}
                    moveTo={moveTo}
                    onLocationChange={(name) => { if (name) setLocation(name); }}
                    storageKey="Metaverse"
                />
                <PointerLockControls />
            </Canvas>
            <S.ButtonWrapper onClick={() => navigate('/selection')}>
                <Button text="NEXT"/>
            </S.ButtonWrapper>
        </S.Wrapper>
    )
}

export default MetaversePage;
