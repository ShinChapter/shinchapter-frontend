import React, { useEffect, useState } from 'react';
import * as S from './HomePage.styled';
import Layout from './../layout/Layout';
import Header from './../components/Header';
import Friend from '../components/Friend';
import Profile from '../components/Profile';
import Information from '../components/Information';
import PurpleBackground from '../assets/images/purple-background.png';
import SchoolShape from '../assets/images/school-shape3.png';
import Character from '../assets/images/character.png';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

const HomePage = () => {
    const navigate = useNavigate();

    const [hasInvite, isHasInvite] = useState(false);
    const [groupCreator, isGroupCreator] = useState();

    const getCharacter = async () => {
        try {
            const response = axiosInstance.get('/character/my');
            console.log('내 캐릭터 조회 성공', response);
        } catch(error) {
            console.log('내 캐릭터 조회 실패', error);
        }
    }
    
    const getInvite = async () => { // 초대 내역 모달을 보여주기 위한 함수
        try {
            const response = await axiosInstance.get('/group/invitations');
            console.log('초대 내역 존재', response);
            isHasInvite(true);
            isGroupCreator(response.data.invited_by.name);
        } catch(error) {
            if (error.status===404) {
                console.log('초대 내역 존재하지 않음');
            }
            console.log('초대 내역 확인 실패', error);
            isHasInvite(false);
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

    useEffect(() => {
        getCharacter();
        getInvite();
    }, [])
    
    return (
        <S.Wrapper backgroundImageUrl={PurpleBackground}>
            <Header />
            <Layout>
                <S.SchoolShapeWrapper backgroundImageUrl={SchoolShape}>
                    <S.Title>Cheers to your new chapter</S.Title>
                    <S.ContentWrapper>
                        <Friend />
                        <Profile />
                        <Information />
                    </S.ContentWrapper>
                </S.SchoolShapeWrapper>
            </Layout>
            {hasInvite && (
                <Modal
                    name={groupCreator}
                    characterImage={Character}
                />
            )}
        </S.Wrapper>
    )
}

export default HomePage
