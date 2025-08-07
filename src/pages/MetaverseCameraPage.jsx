import React, { Suspense, useState } from 'react';
import * as S from './MetaversePage.styled';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei'
import { Model } from './Sswu';
import PlayerControls from '../components/PlayerControls';
import * as THREE from 'three';
import { Physics, RigidBody } from '@react-three/rapier';
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

const MetaverseCameraPage = () => {
    const [moveTo, setMoveTo] = useState(null);
    const [showPoses, setShowPoses] = useState(false);
    const navigate = useNavigate();

    return (
        <S.PhotoWrapper>
            <S.PhotoCanvas>
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
            </S.PhotoCanvas>
            <S.ColumnIconWrapper>
                <S.CloseIcon src={Close} onClick={() => navigate('/metaverse')}/>
                <S.CameraIconWrapper>=
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
