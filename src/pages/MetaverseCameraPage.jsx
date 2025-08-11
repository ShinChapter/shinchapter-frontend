import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Ground from '../components/Ground';
import UniversityModel from '../components/UniversityModel';
import Movement from './../components/Movement';
import axiosInstance from './../apis/axiosInstance';

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
    const navigate = useNavigate();
    const [colliders, setColliders] = useState([]);
    const onLoaded = useCallback((meshes) => setColliders(meshes), []);
    const registerCollider = useCallback((obj) => {
        if (!obj) return;
        setColliders(prev => (prev.includes(obj) ? prev : [...prev, obj]));
    }, []);

    const [moveTo, setMoveTo] = useState(null);
    const [showPoses, setShowPoses] = useState(false);
    const [photos, setPhotos] = useState([]);

    // canvas를 담을 ref
    const canvasWrapperRef = useRef(null);
    const canvasRef = useRef(null);

    // 캔버스가 렌더된 후에 실제 <canvas> 요소를 찾아서 저장
    useEffect(() => {
        if (canvasWrapperRef.current) {
            const canvasElement = canvasWrapperRef.current.querySelector('canvas');
            if (canvasElement) {
                canvasRef.current = canvasElement;
            } else {
                canvasRef.current = null;
            }
        }
    }, []);

    const handleShoot = async () => {
        if (!canvasRef.current) {
            alert('캔버스를 찾을 수 없습니다.');
            return;
        }

        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataURL)).blob();

        const formData = new FormData();
        formData.append('files', blob, 'capture.png');

        try {
            const response = await axiosInstance.post('/album/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('사진 업로드 성공', response.data);

            if (response.data.files && response.data.files.length > 0) {
                setPhotos(prev => [...prev, ...response.data.files]);
            } else {
                setPhotos(prev => [...prev, dataURL]);
            }
        } catch (error) {
            console.error('사진 업로드 실패', error);
            alert('사진 업로드에 실패했습니다.');
        }
    };

    return (
        <S.PhotoWrapper>
            {/* 캔버스 감싸는 div에 ref 걸기 */}
            <S.PhotoCanvas ref={canvasWrapperRef}>
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
                    <fog attach="fog" args={['#6e81a4ff', 80, 1600]} />
                    <Sky distance={450000} sunPosition={[100, 200, 100]} turbidity={6} rayleigh={2} />
                    <Environment preset="city" />
                    <hemisphereLight intensity={0.6} />
                    <directionalLight position={[10, 15, 5]} intensity={1.4} castShadow />
                    <Ground y={0} size={4000} registerCollider={registerCollider} />
                    <Suspense fallback={null}>
                        <UniversityModel onLoaded={onLoaded} />
                    </Suspense>
                    <Movement
                        colliders={colliders}
                        speed={6}
                        eyeHeight={8.0}
                        maxSlopeDeg={50}
                        moveTo={moveTo}
                        storageKey="Metaverse"
                    />
                    <PointerLockControls />
                </Canvas>
            </S.PhotoCanvas>

            <S.ColumnIconWrapper>
                <S.CloseIcon src={Close} onClick={() => navigate('/metaverse')} />
                <S.CameraIconWrapper>
                    {showPoses ? (
                        <S.DropdownIconWrapper>
                            <S.UpIcon src={Up} alt="Up" onClick={() => setShowPoses(false)} />
                            <S.PoseIcon src={Pose1} />
                            <S.PoseIcon src={Pose2} />
                            <S.PoseIcon src={Pose3} />
                        </S.DropdownIconWrapper>
                    ) : (
                        <>
                            {/* 사진 촬영 버튼 */}
                            <S.Icon src={Shoot} onClick={handleShoot} />
                            {/* 포즈 변경 버튼 */}
                            <S.Icon src={Change} onClick={() => setShowPoses(true)} />
                            <S.filmedImage>
                                {photos.length > 0 ? (
                                    <>
                                        <S.PreviewImage src={photos[photos.length - 1]} />
                                        <S.ImageNum>{photos.length}</S.ImageNum>
                                    </>
                                ) : (
                                    <S.EmptyImage />
                                )}
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
