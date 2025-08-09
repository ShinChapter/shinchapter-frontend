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

    const handlePhoto = () => {
        navigate('/hair', { state: image });
    }

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
                    <S.Loading src={loading} />
                )}
                <Button text={state} onClick={state==="RECORD" ? handleRecord : handlePhoto}/>
            </Layout>
        </S.Wrapper>
    )
}

export default CameraPage
