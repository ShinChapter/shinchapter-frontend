import React, { useState, useEffect } from 'react';
import * as S from './InformationPage.styled';
import Button from './../components/Button';
import PurpleGradation from '../assets/images/purple-gradation.png';
import Logo from '../assets/icons/logo.png';
import axiosInstance from './../apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

const InformationPage = () => {
    const navigate = useNavigate();
    const [major, setMajor] = useState();
    const [doubleMajor, setDoubleMajor] = useState();
    const [hashtags, setHashtags] = useState();
    const [introduction, setIntroduction] = useState();

    const handleMajor = (event) => {
        setMajor(event.target.value);
    }

    const handleDoubleMajor = (event) => {
        setDoubleMajor(event.target.value);
    }

    const handleHashtags = (event) => {
        setHashtags(event.target.value);
    }

    const handleIntroduction = (event) => {
        setIntroduction(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            const tags = hashtags
                .split(' ')
                .map(tag => tag.trim())
                .filter(tag => tag.startsWith('#') && tag.length > 1)
                .map(tag => tag.slice(1))
                .slice(0, 4);
            console.log('해시태그:', tags);
            console.log('보낼 데이터', major, doubleMajor, tags, introduction);
            const response = await axiosInstance.post('/user/add-info', {
                major: major,
                minor: doubleMajor,
                hashtags: tags,
                introduction,
            });
            console.log('추가 정보 입력 성공', response);
            navigate('/explanation');
        } catch(error) {
            console.log('추가 정보 입력 실패', error);
        }
    }

    useEffect(() => {
        console.log("현재 URL:", window.location.href);
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            console.log("저장된 토그:", token);
        } else {
            console.log("로그인 토큰이 없습니다. 다시 로그인 해주세요.");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <S.Wrapper>
            <S.LogoWrapper backgroundImageUrl={PurpleGradation}>
                <S.Logo src={Logo}/>
                <S.ServiceName>SHINCHAPTER</S.ServiceName>
            </S.LogoWrapper>
            <S.InformationWrapper>
                <S.Title>WHO AM I</S.Title>
                <S.CategoryWrapper>
                    <S.Category>
                        <S.CategoryName>주전공</S.CategoryName>
                        <S.Input
                            placeholder='AI'
                            onChange={handleMajor}
                        />
                    </S.Category>
                    <S.Category>
                        <S.CategoryName>복수전공 (선택)</S.CategoryName>
                        <S.Input
                            placeholder='지능형 IoT'
                            onChange={handleDoubleMajor}
                        />
                    </S.Category>
                    <S.Category>
                        <S.CategoryName>해시태그</S.CategoryName>
                        <S.Input
                            placeholder='#갓생러 #과탑 (최대 4개)'
                            onChange={handleHashtags}
                        />
                    </S.Category>
                    <S.Category>
                        <S.CategoryName>한줄소개</S.CategoryName>
                        <S.Input
                            placeholder='한줄소개를 입력해주세요.'
                            onChange={handleIntroduction}
                        />
                    </S.Category>
                </S.CategoryWrapper>
                <Button text='NEXT' onClick={handleSubmit}/>
            </S.InformationWrapper>
        </S.Wrapper>
    )
}

export default InformationPage
