import React, { useState, useEffect, useRef } from 'react';
import * as S from './HairPage.styled';
import Layout from './../layout/Layout';
import Button from './../components/Button';
import GradationLine from '../assets/images/gradation-line.png';
import LongHair from '../assets/images/긴생머리.png';
import Bald from '../assets/images/민머리.png';
import ShortNoBang from '../assets/images/숏컷.png';
import BobHair from '../assets/images/단발머리.png';
import MushroomHair from '../assets/images/버섯머리.png';
import WaveHair from '../assets/images/웨이브.png';
import Outfit from '../assets/images/outfit.png';
import Loading from '../assets/images/loading.gif';
import axiosInstance from './../apis/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';

const HairPage = () => {
    const navigate = useNavigate();
    const [image, setImage]= useState(useLocation().state);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [jobId, setJobId] = useState(null);
    const pollingRef = useRef(null);

    const colors = ['#000000', '#C7B372', '#98636A', '#47578A', '#8C5B3E'];
    const colorNames = ['검정', '노랑', '빨강', '파랑', '갈색'];

    const styles = [
        { name: '긴생머리', img: LongHair },
        { name: '민머리', img: Bald },
        { name: '앞머리없는 숏컷', img: ShortNoBang },
        { name: '단발머리', img: BobHair },
        { name: '버섯머리', img: MushroomHair },
        { name: '긴 웨이브', img: WaveHair },
    ]

    const getColor = async () => {
        try {
            const response = await axiosInstance.get('/character/hair/options');
            console.log('헤어 종류', response.data);
        } catch(error) {
            console.log('헤어 종류 에러', error);
        }
    }

    // 캐릭터 생성
    const handleCharacter = async () => {
        if (selectedColor === null || selectedStyle === null) {
            alert("헤어 색상과 스타일을 모두 선택해주세요.");
            return;
        }

        try {
            setIsLoading(true);

            const blob = await (await fetch(image)).blob();
            const formData = new FormData();
            formData.append("file", blob, "photo.jpg");
            formData.append("hair_color", colorNames[selectedColor]);
            formData.append("hair_style", styles[selectedStyle].name);
            console.log('formData1', formData.get("file"));
            console.log('formData2', formData.get("hair_color"));
            console.log('formData3', formData.get("hair_style"));

            const response = await axiosInstance.post('/character/create', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const receivedJobId = response?.data?.job_id;
            if (receivedJobId) {
                setJobId(receivedJobId);
            } else {
                throw new Error("job_id가 응답에 없습니다.");
            }
        } catch (error) {
            setIsLoading(false);
            console.error('캐릭터 생성 요청 실패', error);
            alert("캐릭터 생성 요청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 풀링
    const handleStatus = async () => {
        if (!jobId) return;

        try {
            const response = await axiosInstance.get(`/character/status/${jobId}`);
            const result = response?.data;
            console.log('캐릭터 생성 상태', result);

            if (result.status === 'done') {
                clearInterval(pollingRef.current);
                setIsLoading(false);
                navigate('/character');
            } else if (result.status === 'failed') {
                clearInterval(pollingRef.current);
                setIsLoading(false);
                alert("캐릭터 생성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('캐릭터 생성 상태 가져오기 실패', error);
        }
    };

    useEffect(() => {
        if (jobId) {
            pollingRef.current = setInterval(handleStatus, 5000);
        }

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };
    }, [jobId]);

    useEffect(() => {
        getColor();
    }, [])
    
    return (
        <S.Wrapper>
            <Layout>
                <S.RowRapper>
                    <S.StylingWrapper>
                        <S.FaceWrapper>
                            <S.TitleWrapper backgroundImageUrl={GradationLine}>
                                <S.Title>face</S.Title>
                            </S.TitleWrapper>
                            <S.FaceImage src={image}/>
                        </S.FaceWrapper>
                        <S.HairWrapper>
                            <S.TitleWrapper backgroundImageUrl={GradationLine}>
                                <S.Title>hair color</S.Title>
                            </S.TitleWrapper>
                            <S.ColorOption>
                                {colors.map((color, index) => (
                                    <S.Color
                                        key={color}
                                        color={color}
                                        $isSelected={selectedColor === index}
                                        onClick={() => setSelectedColor(index)}
                                    />
                                ))}
                            </S.ColorOption>
                        </S.HairWrapper>
                        <S.styleWrapper>
                            <S.TitleWrapper backgroundImageUrl={GradationLine}>
                                <S.Title>style</S.Title>
                            </S.TitleWrapper>
                            <S.StyleOption>
                                {styles.map(({ img, name }, index) => (
                                    <S.Style
                                        key={name}
                                        src={img}
                                        alt={name}
                                        $isSelected={selectedStyle === index}
                                        onClick={()=>setSelectedStyle(index)}
                                    />
                                ))}
                            </S.StyleOption>
                        </S.styleWrapper>
                    </S.StylingWrapper>
                    <S.OutfitWrapper>
                        <S.TitleWrapper backgroundImageUrl={GradationLine}>
                            <S.Title>outfits</S.Title>
                        </S.TitleWrapper>
                        <S.OutfitImage src={Outfit}/>
                        <Button text='SAVE' onClick={handleCharacter}/>
                    </S.OutfitWrapper>
                </S.RowRapper>
                {isLoading && (
                    <S.Loading src={Loading}/>
                )}
            </Layout>
        </S.Wrapper>
    )
}

export default HairPage
