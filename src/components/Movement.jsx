import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function Movement({ colliders, speed = 6, eyeHeight = 8.0, maxSlopeDeg = 50, moveTo, onLocationChange, storageKey = "cameraPosition" }) {
    const { camera } = useThree();
    const keys = useRef({ f: false, b: false, l: false, r: false });
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
    const tmp = useMemo(() => ({
        mv: new THREE.Vector3(),
        next: new THREE.Vector3(),
        normal: new THREE.Vector3(),
        normalMatrix: new THREE.Matrix3(),
    }), []);

    const lastLogTime = useRef(0);

    const getBuildingName = (pos) => {
        const { x, y, z } = pos;

        // 건물 위치 반환
        if (x >= -20 && x <= 25 && Math.abs(y - 4.0) < 5 && z >= 5 && z <= 20)
            return "성신여자대학교 정문";

        if (x >= 20 && x <= 40 && Math.abs(y - 18.0) < 5 && z >= -55 && z <= -30)
            return "성신여자대학교 도서관";

        if (x >= -42 && x <= -35 && Math.abs(y - 28.5) < 5 && z >= -150 && z <= -80)
            return "성신여자대학교 성신관";

        if (x >= -45 && x <= 2 && Math.abs(y - 28.5) < 5 && z >= -165 && z <= -150)
            return "성신여자대학교 수정관";

        return "성신여자대학교 안";
    };

    // 키 입력
    useEffect(() => {
        const down = (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp': keys.current.f = true; break;
                case 'KeyS':
                case 'ArrowDown': keys.current.b = true; break;
                case 'KeyA':
                case 'ArrowLeft': keys.current.l = true; break;
                case 'KeyD':
                case 'ArrowRight': keys.current.r = true; break;
            }
        };
        const upHandler = (e) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp': keys.current.f = false; break;
                case 'KeyS':
                case 'ArrowDown': keys.current.b = false; break;
                case 'KeyA':
                case 'ArrowLeft': keys.current.l = false; break;
                case 'KeyD':
                case 'ArrowRight': keys.current.r = false; break;
            }
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    // moveTo가 변경되면 카메라 이동
    useEffect(() => {
        if (moveTo?.position) {
            camera.position.copy(moveTo.position);
            if (moveTo.lookAt) {
                camera.lookAt(moveTo.lookAt);
            }
            sessionStorage.setItem(`${storageKey}Position`, JSON.stringify({
                x: moveTo.position.x,
                y: moveTo.position.y,
                z: moveTo.position.z,
            }));
            sessionStorage.setItem(`${storageKey}Direction`, JSON.stringify({
                x: moveTo.lookAt.x - moveTo.position.x,
                y: moveTo.lookAt.y - moveTo.position.y,
                z: moveTo.lookAt.z - moveTo.position.z,
            }));
        }
    }, [moveTo, camera, storageKey]);

    // 시작 위치
    useEffect(() => {
        const savedPos = sessionStorage.getItem(`${storageKey}Position`);
        const savedDir = sessionStorage.getItem(`${storageKey}Direction`);

        if (savedPos && savedDir) {
            const pos = JSON.parse(savedPos);
            const dir = JSON.parse(savedDir);
            camera.position.set(pos.x, pos.y, pos.z);
            const lookAtVec = new THREE.Vector3(pos.x + dir.x, pos.y + dir.y, pos.z + dir.z);
            camera.lookAt(lookAtVec);
        } else {
            const initialPosition = new THREE.Vector3(-0.34, 4.0, 12.15);
            const initialLookAt = new THREE.Vector3(-0.36, 3.98, 11.15);
            camera.position.copy(initialPosition);
            camera.lookAt(initialLookAt);
        }
    }, [camera, storageKey]);

    useFrame((state, dt) => {
        const { mv, next, normal, normalMatrix } = tmp;

        sessionStorage.setItem(`${storageKey}Position`, JSON.stringify({
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        }));

        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        sessionStorage.setItem(`${storageKey}Direction`, JSON.stringify({
            x: direction.x,
            y: direction.y,
            z: direction.z
        }));

        mv.set(
            (keys.current.r ? 1 : 0) + (keys.current.l ? -1 : 0),
            0,
            (keys.current.b ? 1 : 0) + (keys.current.f ? -1 : 0)
        );

        if (mv.lengthSq() > 0) {
            mv.normalize().multiplyScalar(speed).applyEuler(camera.rotation);
            next.copy(camera.position).addScaledVector(mv, dt);

            if (colliders && colliders.length) {
                raycaster.set(new THREE.Vector3(next.x, 1000, next.z), new THREE.Vector3(0, -1, 0));
                const hits = raycaster.intersectObjects(colliders, true);
                if (hits.length) {
                    const h = hits[0];
                    normal.copy(h.face?.normal || up);
                    normalMatrix.getNormalMatrix(h.object.matrixWorld);
                    normal.applyMatrix3(normalMatrix).normalize();
                    const slopeRad = Math.acos(THREE.MathUtils.clamp(normal.dot(up), -1, 1));
                    const slopeDeg = THREE.MathUtils.radToDeg(slopeRad);

                    if (slopeDeg <= maxSlopeDeg) {
                        const targetY = h.point.y + eyeHeight;
                        camera.position.set(
                            next.x,
                            THREE.MathUtils.lerp(camera.position.y, targetY, Math.min(1, dt * 10)),
                            next.z
                        );
                    } else {
                        return;
                    }
                } else {
                    camera.position.set(next.x, camera.position.y, next.z);
                }
            } else {
                camera.position.copy(next);
            }
        }

        const buildingName = getBuildingName(camera.position);
        if (onLocationChange) {
            onLocationChange(buildingName);
        }

        if (state.clock.elapsedTime - lastLogTime.current > 1) {
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            const lookAtPosition = camera.position.clone().add(direction);

            console.log(
                `현재 위치: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`
            );
            console.log(
                `바라보는 좌표: (${lookAtPosition.x.toFixed(2)}, ${lookAtPosition.y.toFixed(2)}, ${lookAtPosition.z.toFixed(2)})`
            );

            lastLogTime.current = state.clock.elapsedTime;
        }
    });

    return null;
}
