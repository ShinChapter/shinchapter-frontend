import React, { useState, useEffect, useRef } from 'react';
import * as S from './CameraPage.styled';
import Layout from './../layout/Layout';
import Button from '../components/Button';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import loading from '../assets/images/loading.gif';

const CameraPage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState("RECORD"); // record, next, LOADING 중 하나
    const [image, setImage] = useState(null);
    const [jobId, setJobId] = useState(null);
    const [status, setStatus] = useState(null);
    const webcamRef = useRef(null);
    const pollingRef = useRef(null);

    const getFlippedImage = (webcam) => {
        const screenshot = webcam.getScreenshot();
        if (!screenshot) return null;

        const img = new Image();
        img.src = screenshot;

        return new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.translate(img.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(img, 0, 0);

                const flippedData = canvas.toDataURL('image/jpeg');
                resolve(flippedData);
            };
        });
    };

    const handleRecord = async () => {
        if (webcamRef.current) {
            const flippedScreenshot = await getFlippedImage(webcamRef.current);
            if (flippedScreenshot) {
                setImage(flippedScreenshot);
                setState("NEXT");
            }
        }
    }

    const handlePhoto = async () => {
        try {
            setState("LOADING");
            const blob = await (await fetch(image)).blob();
            const formData = new FormData();
            formData.append("file", blob, "photo.jpg");
            const response = await axiosInstance.post('/character/create', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            const receivedJobId = response?.data?.job_id;
            if (receivedJobId) {
                setJobId(receivedJobId);
                console.log('사진 전송 성공, job_id:', receivedJobId);
            } else {
                console.warn('job_id가 응답에 없습니다.');
            }
        } catch (error) {
            console.log('사진 전송 실패', error);
            setState("NEXT");
        }
    }

    const handleStatus = async () => {
        if (!jobId) return;

        try {
            const response = await axiosInstance.get(`/character/status/${jobId}`);
            const result = response?.data;
            console.log('캐릭터 생성 상태', result);
            setStatus(result.status);

            if (result.status === 'done') {
                clearInterval(pollingRef.current);
                navigate('/explanation', { state: { modelUrl: result.model_url } });
            } else if (result.status === 'failed') {
                clearInterval(pollingRef.current);
                alert("캐릭터 생성에 실패했습니다. 다시 시도해주세요.");
                setState("NEXT");
            }
        } catch (error) {
            console.log('캐릭터 생성 상태 가져오기 실패', error);
        }
    }

    useEffect(() => {
        if (jobId) {
            pollingRef.current = setInterval(handleStatus, 5000);
        }

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        }
    }, [jobId])

    return (
        <S.Wrapper>
            <Layout>
                <S.CameraWrapper>
                    {image ? (
                        <img
                            src={image}
                            alt="Captured"
                            style={{
                                width: '100%',
                                height: '480px',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Webcam
                            style={{
                                width: '100%',
                                height: '480px',
                                objectFit: 'cover',
                                transform: 'scaleX(-1)'
                            }}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 860,
                                height: 480,
                                facingMode: "user",
                            }}
                            ref={webcamRef}
                        />
                    )}
                </S.CameraWrapper>
                {state === "LOADING" && (
                    <img src={loading} />
                )}
                <Button text={state} onClick={state==="RECORD" ? handleRecord : handlePhoto}/>
            </Layout>
        </S.Wrapper>
    )
}

export default CameraPage
