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

    const [myName, setMyName] = useState();
    const [hasInvite, isHasInvite] = useState(false);
    const [groupCreator, isGroupCreator] = useState();
    const [characterImage, setCharacterImage] = useState();
    const [groupId, setGroupId] = useState();

    const [refreshGroupFlag, setRefreshGroupFlag] = useState(false);
    const refreshGroup = () => setRefreshGroupFlag(prev => !prev);

    const handleName = async () => {
        try {
            const response = await axiosInstance.get('/me');
            setMyName(response.data.name);
        } catch(error) {
            console.log('이름 조회 실패', error);
        }
    }

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
            if (response.data.length>0) {
                console.log('초대 내역 존재', response.data[0]);
                isHasInvite(true);
                isGroupCreator(response.data[0].invited_by.name);
                setGroupId(response.data[0].group_id);
                setCharacterImage(response.data[0].invited_by.image);
            } else {
                console.log('초대 내역 없음', response);
                isHasInvite(false);
            }
        } catch(error) {
            console.log('초대 내역 확인 실패', error);
            isHasInvite(false);
        }
    }

    useEffect(() => {
        console.log("현재 URL:", window.location.href);
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const storageToken = localStorage.getItem("token");

        if (token) {
            localStorage.setItem("token", token);
            console.log("저장된 토큰:", token);
        } else if (storageToken) {
            console.log("저장된 토큰 사용:", storageToken);
        } else {
            console.log("로그인 토큰이 없습니다. 다시 로그인 해주세요.");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        handleName();
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
                        <Friend refreshFlag={refreshGroupFlag} myName={myName} />
                        <Profile />
                        <Information />
                    </S.ContentWrapper>
                </S.SchoolShapeWrapper>
            </Layout>
            {hasInvite && (
                <Modal
                    name={groupCreator}
                    characterImage={characterImage}
                    groupId={groupId}
                    onClose={() => {
                        isHasInvite(false);
                        isGroupCreator(false);
                        refreshGroup();
                    }}
                />
            )}
        </S.Wrapper>
    )
}

export default HomePage
