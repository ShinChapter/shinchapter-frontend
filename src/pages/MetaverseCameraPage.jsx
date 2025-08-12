import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import * as S from './MetaversePage.styled';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Close from '../assets/icons/close.png';
import Pose1 from '../assets/images/pose1.png';
import Pose2 from '../assets/images/pose2.png';
import Pose3 from '../assets/images/pose3.png';
import { useNavigate } from 'react-router-dom';
import Ground from '../components/Ground';
import UniversityModel from '../components/UniversityModel';
import Movement from './../components/Movement';
import axiosInstance from './../apis/axiosInstance';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const toAbs = (u) => {
  if (!u) return '';
  if (/^(https?:|data:)/i.test(u)) {
    const glbMatch = u.match(/\/download\/.+\.glb$/);
    if (glbMatch) return `/glb${glbMatch[0]}`;
    return u;
  }
  return `/${u.replace(/^\//, '')}`;
};

const getAuthHeader = () => {
  const h =
    axiosInstance.defaults.headers?.common?.Authorization ||
    axiosInstance.defaults.headers?.Authorization;
  if (h) return h;
  const t = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  return t ? `Bearer ${t}` : '';
};

function CharacterModel({ url, position = [0, 0, 0], rotation = 0, targetHeight = 1, yOnGround = 0 }) {
  const [scene, setScene] = useState(null);
  const [loadErr, setLoadErr] = useState(null);
  const ref = useRef();
  const token = getAuthHeader();

  useEffect(() => {
    if (!url) return;
    const loader = new GLTFLoader();
    if (token && loader.setRequestHeader) loader.setRequestHeader({ Authorization: token });
    if (loader.setCrossOrigin) loader.setCrossOrigin('anonymous');

    let cancelled = false;
    loader.load(
      toAbs(url),
      (gltf) => {
        if (cancelled) return;
        gltf.scene.traverse((o) => {
          if (o.isMesh || o.isSkinnedMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        setScene(gltf.scene);
        setLoadErr(null);
      },
      undefined,
      (err) => {
        if (cancelled) return;
        setLoadErr(err || new Error('Failed to load GLB'));
        setScene(null);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [url, token]);

  useEffect(() => {
    if (!scene || !ref.current) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = targetHeight / (size.y || 1);
    ref.current.scale.setScalar(s);

    const box2 = new THREE.Box3().setFromObject(ref.current);
    const size2 = new THREE.Vector3();
    const center2 = new THREE.Vector3();
    box2.getSize(size2);
    box2.getCenter(center2);
    const bottomY = center2.y - size2.y / 2;
    ref.current.position.y += (yOnGround - bottomY);
  }, [scene, targetHeight, yOnGround]);

  if (!scene || loadErr) return null;
  return (
    <group ref={ref} position={position} rotation={[0, rotation, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function PlayerTracker({ setPlayerPos, setPlayerDir }) {
  const dirRef = useRef(new THREE.Vector3());
  useFrame(({ camera }) => {
    camera.getWorldDirection(dirRef.current);
    setPlayerDir(dirRef.current.clone());
    setPlayerPos(camera.position.clone());
  });
  return null;
}

const MetaverseCameraPage = () => {
  const navigate = useNavigate();
  const controlsRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [colliders, setColliders] = useState([]);
  const onLoaded = useCallback((meshes) => setColliders(meshes), []);
  const registerCollider = useCallback((obj) => {
    if (obj) setColliders((prev) => (prev.includes(obj) ? prev : [...prev, obj]));
  }, []);

  const [avatar, setAvatar] = useState(null);
  const [playerPos, setPlayerPos] = useState(null);
  const [playerDir, setPlayerDir] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  const canvasWrapperRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axiosInstance.get('/character/my');
        if (!alive) return;
        setAvatar(data);
        setModelUrl(data?.glb_url || null);
      } catch (e) {
        if (!alive) return;
        console.error(e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const selectDefault = useCallback(
    (e) => {
      e?.stopPropagation?.();
      setModelUrl(avatar?.glb_url || null);
    },
    [avatar]
  );

  const selectVPose = useCallback(
    (e) => {
      e?.stopPropagation?.();
      const v = avatar?.extra_model_urls?.v_pose || avatar?.glb_url;
      setModelUrl(v || null);
    },
    [avatar]
  );

  const selectFlower = useCallback(
    (e) => {
      e?.stopPropagation?.();
      const f = avatar?.extra_model_urls?.flower || avatar?.glb_url;
      setModelUrl(f || null);
    },
    [avatar]
  );

  const handleCanvasPointerDown = useCallback(
    (e) => {
      if (e.target && e.target.tagName === 'CANVAS' && !isLocked) {
        controlsRef.current?.lock?.();
      }
    },
    [isLocked]
  );

  return (
    <S.PhotoWrapper>
      <S.PhotoCanvas ref={canvasWrapperRef} onPointerDown={handleCanvasPointerDown}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 6, 15], fov: 60, near: 0.3, far: 600 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
            logarithmicDepthBuffer: true,
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor('#0b0f14');
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            camera.rotation.x = THREE.MathUtils.degToRad(-10);
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
            {modelUrl && playerPos && playerDir && (
              <CharacterModel
                key={modelUrl}
                url={modelUrl}
                position={playerPos
                  .clone()
                  .add(playerDir.clone().multiplyScalar(2))
                  .add(new THREE.Vector3(0, -0.7, 0))}
                rotation={Math.atan2(-playerDir.x, -playerDir.z)}
                targetHeight={1}
              />
            )}
          </Suspense>

          <Movement
            colliders={colliders}
            speed={6}
            eyeHeight={3.0}
            maxSlopeDeg={50}
            moveTo={null}
            storageKey="Metaverse"
          />

          <PointerLockControls
            ref={controlsRef}
            onLock={() => setIsLocked(true)}
            onUnlock={() => setIsLocked(false)}
          />

          <PlayerTracker setPlayerPos={setPlayerPos} setPlayerDir={setPlayerDir} />
        </Canvas>

        {avatar?.preview_url && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: 16,
              bottom: 16,
              width: 100,
              height: 100,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              zIndex: 5,
            }}
          >
            <img
              src={toAbs(avatar.preview_url)}
              alt="캐릭터 미리보기"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </S.PhotoCanvas>

      <S.ColumnIconWrapper onPointerDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <S.CloseIcon src={Close} onClick={() => navigate('/metaverse')} />
        <S.CameraIconWrapper>
          <S.DropdownIconWrapper>
            <S.PoseIcon src={Pose1} onClick={selectVPose} />
            <S.PoseIcon src={Pose2} onClick={selectFlower} />
            <S.PoseIcon src={Pose3} onClick={selectDefault} />
          </S.DropdownIconWrapper>
        </S.CameraIconWrapper>
      </S.ColumnIconWrapper>
    </S.PhotoWrapper>
  );
};

export default MetaverseCameraPage;
