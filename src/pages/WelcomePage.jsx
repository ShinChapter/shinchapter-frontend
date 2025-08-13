import React from 'react';
import * as S from './WelcomePage.styled';
import Layout from './../layout/Layout';
import Button from '../components/Button';
import Soojung from '../assets/images/soojung.png';
import Logo from '../assets/icons/logo.png';
import Title from '../assets/images/title.png';
import { useNavigate } from 'react-router-dom';
import Video from '../assets/video/intro.mp4';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.BackgroundVideo autoPlay loop muted playsInline>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
            </S.BackgroundVideo>
            <S.Overlay />
            <Layout>
                <S.Container>
                    <S.Logo src={Logo} />
                    <S.Title src={Title} />
                    <S.Desc>SUNGSHIN WOMEN'S UNIVERSITY + METAVERSE</S.Desc>
                    <Button text="START" onClick={() => navigate('/login')}/>
                </S.Container>
            </Layout>
        </S.Wrapper>
    )
}

export default WelcomePage
