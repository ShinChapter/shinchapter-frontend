import React, { useState, useEffect } from 'react';
import * as S from './LoginPage.styled';
import Layout from './../layout/Layout';
import Button from '../components/Button';
import Sungshin from '../assets/images/sungshin.png';
import SchoolShape1 from '../assets/images/school-shape1.png';
import Google from '../assets/icons/google.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [firstTry, setFirstTry] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fail = params.get("error");
        if (fail === "invalid_email") {
            setFirstTry(false);
        }
    }, [location.search]);

    const handleLogin = async () => {
        try {
            console.log('구글 로그인 시도');
            window.location.href = `${process.env.REACT_APP_BASE_URL}/login/google`;

        } catch(error) {
            console.log('구글 로그인 시도 실패', error);
        }
    }

    return (
        <S.Wrapper backgroundImageUrl={Sungshin}>
            <Layout>
                <S.Container>
                    <S.SchoolShape src={SchoolShape1}/>
                    <S.Title>
                        {firstTry ? "MISSION" : "FAILED"}
                    </S.Title>
                    <S.RowWrapper>
                        <S.Icon src={Google}/>
                        <S.Desc>
                            {firstTry ? "학교 이메일로 바로 입장하기" : "학교 이메일로 로그인 해주세요"}
                        </S.Desc>
                    </S.RowWrapper>
                    <Button 
                        text={firstTry ? "START" : "RERTY"}
                        onClick={handleLogin} 
                    />
                </S.Container>
            </Layout>
        </S.Wrapper>
    )
}

export default LoginPage
