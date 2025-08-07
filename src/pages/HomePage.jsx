import React, { useEffect, useState } from 'react';
import * as S from './HomePage.styled';
import Layout from './../layout/Layout';
import Header from './../components/Header';
import Friend from '../components/Friend';
import Profile from '../components/Profile';
import Information from '../components/Information';
import PurpleBackground from '../assets/images/purple-background.png';
import SchoolShape from '../assets/images/school-shape3.png';
import Modal from '../components/Modal';
import axiosInstance from '../apis/axiosInstance';

const HomePage = () => {
    const getCharacter = async () => {
        try {
            const response = axiosInstance.get('/character/media');
            console.log('내 캐릭터 조회 성공', response);
        } catch(error) {
            console.log('내 캐릭터 조회 실패', error);
        }
    }

    useEffect(() => {
        getCharacter();
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
            {/* <Modal/> */}
        </S.Wrapper>
    )
}

export default HomePage
