import React, { Suspense, useCallback, useEffect, useState, useRef } from 'react';
import * as S from './MetaversePage.styled';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Camera from '../assets/icons/camera2.png';
import NoCamera from '../assets/icons/no-camera.png';
import Change from '../assets/icons/change.png';
import Pin from '../assets/icons/Pin.png';
import Up from '../assets/icons/up.png';
import MiniSungshin from '../assets/images/mini-sungshin.png';
import MiniSoojung from '../assets/images/mini-soojung.png';
import MiniLibrary from '../assets/images/mini-library.png';
import Header from '../components/Header';
import Button from '../components/Button';
import Ground from '../components/Ground';
import UniversityModel from '../components/UniversityModel';
import Movement from '../components/Movement';
import axiosInstance from '../apis/axiosInstance';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

const toAbs = (u) => {
  if (!u) return '';
  if (/^(https?:|data:)/i.test(u)) {
    const m = u.match(/\/download\/.+\.glb$/);
    return m ? `/glb${m[0]}` : u;
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

function FinalModel({ url, position = [0, 0, 0], rotationY = 0, targetHeight = 1.3, yOnGround = 0 }) {
  const [scene, setScene] = useState(null);
  const [err, setErr] = useState(null);
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
        setErr(null);
      },
      undefined,
      (e) => {
        if (cancelled) return;
        setErr(e || new Error('GLB load failed'));
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
    const s = targetHeight / (size.y || 1.3);
    ref.current.scale.setScalar(s);
    const box2 = new THREE.Box3().setFromObject(ref.current);
    const size2 = new THREE.Vector3();
    const center2 = new THREE.Vector3();
    box2.getSize(size2);
    box2.getCenter(center2);
    const bottomY = center2.y - size2.y / 2;
    ref.current.position.y += yOnGround - bottomY;
  }, [scene, targetHeight, yOnGround]);

  if (!scene || err) return null;
  return (
    <group ref={ref} position={position} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const MetaversePage = () => {
  const [groupId, setGroupId] = useState();
  const [colliders, setColliders] = useState([]);
  const onLoaded = useCallback((meshes) => setColliders(meshes), []);
  const registerCollider = useCallback((obj) => {
    if (!obj) return;
    setColliders((prev) => (prev.includes(obj) ? prev : [...prev, obj]));
  }, []);
  const [moveTo, setMoveTo] = useState(null);
  const [showBuildings, setShowBuildings] = useState(false);
  const [location, setLocation] = useState('성신여자대학교 정문');
  const [groupPosition, steGroupPoition] = useState([]);
  const navigate = useNavigate();
  const [finalModels, setFinalModels] = useState([]);
  const [finalLoadErr, setFinalLoadErr] = useState('');

  const handleGroupId = async () => {
    try {
      const response = await axiosInstance.get('/album-group/my');
      const id = response.data.group_id;
      console.log('group id', id);
      setGroupId(id);
      handleGroupPosition(id)
    } catch(error) {
      console.log('group id 가져오기 실패', error.response);
    }
  }

  const handleGroupPosition = async (id) => {
    try {
      const response = await axiosInstance.get(`/group/${id}`);
      console.log('멤버 위치 정보', response.data.members);
      setFinalModels(response.data.members);
    } catch(error) {
      console.log('멤버 위치 정보 가져오기 실패', error.response);
    }
  }

  useEffect(() => {
    handleGroupId();
  }, [])
  
  useEffect(() => {
  if (groupId) {
    handleGroupPosition(groupId);
  }
}, [groupId]);

  // useEffect(() => {
  //   let alive = true;
  //   if (!groupId) {
  //     setFinalModels([]);
  //     return;
  //   }
  //   (async () => {
  //     try {
  //       const r1 = await axiosInstance.get(`/group/${groupId}/final-model`);
  //       if (!alive) return;
  //       const arr = Array.isArray(r1.data) ? r1.data : r1.data?.items || [];
  //       setFinalModels(arr);
  //       setFinalLoadErr('');
  //     } catch {
  //       try {
  //         const r2 = await axiosInstance.get(`/group/${groupId}/final-model`);
  //         if (!alive) return;
  //         const one = r2.data ? [r2.data] : [];
  //         setFinalModels(one);
  //         setFinalLoadErr('');
  //       } catch (e) {
  //         if (!alive) return;
  //         console.error(e);
  //         setFinalModels([]);
  //         setFinalLoadErr('최종 모델 목록을 불러오지 못했습니다.');
  //       }
  //     }
  //   })();
  //   return () => {
  //     alive = false;
  //   };
  // }, [groupId]);

  const handlePhotoCount = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/album/list');
      if ((data?.images?.length || 0) < 5) {
        alert('사진을 5장 이상 촬영해주세요.');
      } else {
        navigate(`/selection/${groupId || ''}`);
      }
    } catch (error) {
      console.log('사진 목록 조회 실패', error?.response);
    }
  }, [navigate, groupId]);

  return (
    <S.Wrapper>
      <Header />
      <S.IconWrapper>
        <S.LocationWrapper>
          <S.BlurLayer />
          <S.Location>{location}</S.Location>
        </S.LocationWrapper>
        <S.CameraIcon
          src={location !== '성신여자대학교 안' ? Camera : NoCamera}
          // onClick={location !== '성신여자대학교 안' ? () => navigate(`/metaverse/camera/${groupId || ''}`) : undefined}
          onClick={location !== '성신여자대학교 안' ? () => navigate(`/metaverse/camera}`) : undefined}
          style={{ cursor: location !== '성신여자대학교 안' ? 'pointer' : 'default' }}
        />
        {!showBuildings && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <S.Icon src={Change} alt="Change" onClick={() => setShowBuildings(true)} title="Change" />
            <S.Icon
              src={Pin}
              alt="Pin"
              title="Pin"
              // onClick={() => navigate(`/pin/${groupId || ''}`)}
              onClick={() => navigate(`/pin`)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
        {showBuildings && (
          <S.DropdownIconWrapper>
            <S.UpIcon src={Up} alt="Up" onClick={() => setShowBuildings(false)} title="Up" />
            {Object.keys(BUILDING_TARGETS).map((building) => (
              <S.BuildingIcon
                key={building}
                src={BUILDING_IMAGES[building]}
                alt={building}
                onClick={() =>
                  setMoveTo({
                    position: BUILDING_TARGETS[building].position.clone(),
                    lookAt: BUILDING_TARGETS[building].lookAt.clone(),
                  })
                }
                title={building}
              />
            ))}
          </S.DropdownIconWrapper>
        )}
      </S.IconWrapper>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4, 15], fov: 60, near: 0.3, far: 600 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false, logarithmicDepthBuffer: true }}
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
          {/* {finalModels.map((m, idx) => (
            m.final_model && 
              <FinalModel
                key={m.id || idx}
                url={m.final_model.glb_url}
                position={[m.final_model.position.x ?? 0, m.final_model.position.y ?? 0, m.final_model.position.z ?? 0]}
                rotationY={m.rotation_y ?? 0}
                targetHeight={1}
                yOnGround={0}
              />
          ))} */}
          {finalModels.map((m, idx) => {
            if (!m.final_model || !m.final_model.glb_url) return null;

            const pos = m.final_model.position
              ? [m.final_model.position.x, m.final_model.position.y, m.final_model.position.z]
              : [0, 0, 0];

            return (
              <FinalModel
                key={m.id || idx}
                url={m.final_model.glb_url}
                position={pos}
                rotationY={m.rotation_y ?? 0}
                targetHeight={1.3}
                yOnGround={0}
              />
            );
          })}
        </Suspense>
        <Movement
          colliders={colliders}
          speed={6}
          eyeHeight={8.0}
          maxSlopeDeg={50}
          moveTo={moveTo}
          onLocationChange={(name) => name && setLocation(name)}
          storageKey="Metaverse"
        />
        <PointerLockControls />
      </Canvas>

      {finalLoadErr && (
        <div
          style={{
            position: 'fixed',
            left: 16,
            bottom: 100,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(200,50,50,0.85)',
            color: '#fff',
            fontSize: 12,
            zIndex: 9,
          }}
        >
          {finalLoadErr}
        </div>
      )}

      <S.ButtonWrapper onClick={handlePhotoCount}>
        <Button text="NEXT" />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default MetaversePage;
