import React, { useState, useRef } from 'react';
import * as S from './CameraPage.styled';
import Layout from './../layout/Layout';
import Button from '../components/Button';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

const CameraPage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState("RECORD"); // record, next 중 하나
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

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

    const handleClick = async () => {
        if (state === "RECORD") {
            if (webcamRef.current) {
                const flippedScreenshot = await getFlippedImage(webcamRef.current);
                if (flippedScreenshot) {
                    setImage(flippedScreenshot);
                    setState("NEXT");
                }
            }
        } else if (state === "NEXT") {
            // 백엔드로 사진 전송 코드 추가
            
            navigate('/character');

        }
    };

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
                <Button text={state} onClick={handleClick}/>
            </Layout>
        </S.Wrapper>
    )
}

export default CameraPage
