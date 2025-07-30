import React from 'react';
import * as S from './MainPage.styled';
import Layout from './../layout/Layout';
import Button from '../components/Button';
import Soojung from '../assets/images/soojung.png';
import Logo from '../assets/icons/logo.png';
import Title from '../assets/images/title.png';

const MainPage = () => {
    return (
        <S.Wrapper backgroundImageUrl={Soojung}>
            <Layout>
                <S.Container>
                    <S.Logo src={Logo} />
                    <S.Title src={Title} />
                    <S.Desc>SUNGSHIN WOMEN'S UNIVERSITY + METAVERSE</S.Desc>
                    <Button text="START" />
                </S.Container>
            </Layout>
        </S.Wrapper>
    )
}

export default MainPage
