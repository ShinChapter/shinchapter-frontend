import React, { useState } from 'react';
import * as S from './CharacterPage.styled';
import Layout from './../layout/Layout';
import Button from './../components/Button';
import Light from '../assets/images/light.png';
import Character from '../assets/images/character.png';
import Blur from '../assets/images/blur.png';

const CharacterPage = () => {
    const [name, setName] = useState('사용자');

    return (
        <S.Wrapper>
            <Layout>
                <S.RowWrapper>
                <S.CharacterWrapper>
                    <S.Light src={Light} />
                    <S.Character src={Character} />
                </S.CharacterWrapper>
                <S.RightWrapper>
                    <S.BlurImg src={Blur} />
                    <S.DescWrapper>
                        <S.Desc>안녕하세요 <S.Name>{name}</S.Name>님</S.Desc>
                        <S.Desc>당신의 새 출발을 응원합니다</S.Desc>
                    </S.DescWrapper>
                    <Button text="ENTER"/>
                </S.RightWrapper>
                </S.RowWrapper>
            </Layout>
        </S.Wrapper>
    )
}

export default CharacterPage
