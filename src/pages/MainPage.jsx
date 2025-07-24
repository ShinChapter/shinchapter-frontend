import React from 'react';
import * as S from "./MainPage.styeld";
import Layout from './../layout/Layout';
import Soojung from '../assets/images/soojung.png';

const MainPage = () => {
    return (
        <S.Wrapper backgroundImageUrl={Soojung}>
            <Layout>
                
            </Layout>
        </S.Wrapper>
    )
}

export default MainPage
