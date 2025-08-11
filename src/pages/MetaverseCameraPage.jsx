import React, { Suspense, useState, useCallback } from 'react';
import * as S from './MetaversePage.styled';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Change from '../assets/icons/change.png';
import Up from '../assets/icons/up.png';
import MiniSungshin from '../assets/images/mini-sungshin.png';
import MiniSoojung from '../assets/images/mini-soojung.png';
import MiniLibrary from '../assets/images/mini-library.png';
import Shoot from '../assets/icons/shoot.png';
import Close from '../assets/icons/close.png';
import Pose1 from '../assets/images/pose1.png';
import Pose2 from '../assets/images/pose2.png';
import Pose3 from '../assets/images/pose3.png';
import { Photos } from '../constant/photoData';
import { useNavigate } from 'react-router-dom';
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

const MetaverseCameraPage = () => {
    const [colliders, setColliders] = useState([]);
    const onLoaded = useCallback((meshes) => setColliders(meshes), []);
    const registerCollider = useCallback((obj) => {
        if (!obj) return;
            setColliders(prev => (prev.includes(obj) ? prev : [...prev, obj]));
    }, []);

    const [moveTo, setMoveTo] = useState(null);
    const [showPoses, setShowPoses] = useState(false);
    const navigate = useNavigate();

    return (
        <S.PhotoWrapper>
            <S.PhotoCanvas>
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
                    />
                    <PointerLockControls />
                </Canvas>
            </S.PhotoCanvas>
            <S.ColumnIconWrapper>
                <S.CloseIcon src={Close} onClick={() => navigate('/metaverse')}/>
                <S.CameraIconWrapper>
                    {showPoses ? (
                        <S.DropdownIconWrapper>
                            <S.UpIcon
                                src={Up}
                                alt="Up"
                                onClick={() => setShowPoses(false)}
                            />
                            <S.PoseIcon
                                src={Pose1}
                            />
                            <S.PoseIcon
                                src={Pose2}
                            />
                            <S.PoseIcon
                                src={Pose3}
                            />
                        </S.DropdownIconWrapper>
                    ) : (
                        <>
                            <S.Icon src={Shoot} onClick={() => {}}/> {/* 사진 찍기 버튼 */}
                            <S.Icon src={Change} onClick={() => setShowPoses(true)}/> {/* 포즈 바꾸기 버튼 */}
                            <S.filmedImage>
                                {Photos.length > 0 ? (
                                    // 사진 미리보기
                                    <>
                                        <S.PreviewImage src={Photos[Photos.length-1]}/>
                                        <S.ImageNum>{Photos.length}</S.ImageNum>
                                    </>
                                ) : (
                                    // 어두운 화면
                                    <S.EmptyImage />
                                )
                            }
                            </S.filmedImage>
                        </>
                    )}
                </S.CameraIconWrapper>
                <p></p>
            </S.ColumnIconWrapper>
        </S.PhotoWrapper>
    )
}

export default MetaverseCameraPage;
