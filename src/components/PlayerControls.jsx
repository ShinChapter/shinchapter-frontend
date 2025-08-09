import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

const SPEED = 0.01;

const PlayerControls = ({ moveTo, setMoveTo }) => {
    const ref = useRef();
    const { camera } = useThree();
    const keys = useRef({});

    useEffect(() => {
        const down = (e) => (keys.current[e.code] = true);
        const up = (e) => (keys.current[e.code] = false);
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
        window.removeEventListener('keydown', down);
        window.removeEventListener('keyup', up);
        };
    }, []);


    useEffect(() => {
        if (ref.current) {
        ref.current.setTranslation({ x: -0.09, y: -1.5, z: 1.34 }, true); // 시작 위치
        }
    }, []);

useFrame(() => {
    const body = ref.current;
    if (!body) return;

    if (moveTo) {
        body.setTranslation(moveTo, true);
        setMoveTo(null);
        return;
    }

    // 현재 위치
    const pos = body.translation();

    // 이동 방향 계산
    const front = new THREE.Vector3(0, 0, keys.current['KeyS'] ? 1 : keys.current['KeyW'] ? -1 : 0);
    const side = new THREE.Vector3(keys.current['KeyD'] ? 1 : keys.current['KeyA'] ? -1 : 0, 0, 0);
    const vertical = new THREE.Vector3(0, keys.current['KeyE'] ? 1 : keys.current['KeyQ'] ? -1 : 0, 0);

    const dir = new THREE.Vector3().add(front).add(side);

    if (dir.length() > 0) {
        dir.normalize().applyEuler(camera.rotation).multiplyScalar(SPEED);
    }

    // 새 위치 계산 (수평 + 수직)
    const newPos = new THREE.Vector3(
        pos.x + dir.x,
        pos.y + vertical.y * SPEED,
        pos.z + dir.z
    );

    // 위치 직접 세팅 (kinematicPosition 타입이라 가능)
    body.setNextKinematicTranslation(newPos);

    // 카메라 따라가기
    camera.position.set(newPos.x, newPos.y + 1.6, newPos.z);

    // 카메라가 바라보는 방향 계산
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);

    let facing = '';
    const absX = Math.abs(camDir.x);
    const absY = Math.abs(camDir.y);
    const absZ = Math.abs(camDir.z);

    if (absX > absY && absX > absZ) {
        facing = camDir.x > 0 ? '+X' : '-X';
    } else if (absY > absX && absY > absZ) {
        facing = camDir.y > 0 ? '+Y' : '-Y';
    } else {
        facing = camDir.z > 0 ? '+Z' : '-Z';
    }

    // 위치 + 바라보는 방향 출력
    console.log(`현재 위치: new THREE.Vector3(${newPos.x.toFixed(2)}, ${newPos.y.toFixed(2)}, ${newPos.z.toFixed(2)}), 바라보는 방향: ${facing}`);
});


    return (
        <RigidBody
        ref={ref}
        colliders={false}
        type="kinematicPosition"
        enabledRotations={[false, false, false]}
        gravityScale={0}
        >
        <CapsuleCollider args={[0.5, 0.5]} />
        </RigidBody>
    )
}

export default PlayerControls;
