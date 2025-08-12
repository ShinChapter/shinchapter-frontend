import React, { useState, useEffect } from 'react';
import * as S from './CharacterPage.styled';
import Layout from './../layout/Layout';
import Button from './../components/Button';
import Light from '../assets/images/light.png';
import Character from '../assets/images/character.png';
import Blur from '../assets/images/blur.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

const CharacterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [characterImage, setCharacterImage] = useState();

    const handleName = async () => {
        try {
            const response = await axiosInstance.get('/me');
            setName(response.data.name);
        } catch(error) {
            console.log('이름 조회 실패', error);
        }
    }

    const handleCharacter = async () => {
        try {
            const response = await axiosInstance.get('/character/my');
            console.log('캐릭터 조회', response);
            setCharacterImage(response.data.preview_url);
        } catch(error) {
            console.log('캐릭터 조회 실패', error);
        }
    }
    
    useEffect(() => {
        handleName();
        handleCharacter();
    }, [])

    return (
        <S.Wrapper>
            <Layout>
                <S.RowWrapper>
                <S.CharacterWrapper>
                    <S.Light src={Light} />
                    <S.Character src={characterImage} />
                </S.CharacterWrapper>
                <S.RightWrapper>
                    <S.BlurImg src={Blur} />
                    <S.DescWrapper>
                        <S.Desc>안녕하세요 <S.Name>{name}</S.Name>님</S.Desc>
                        <S.Desc>당신의 새 출발을 응원합니다</S.Desc>
                    </S.DescWrapper>
                    <Button text="ENTER" onClick={() => navigate('/home')}/>
                </S.RightWrapper>
                </S.RowWrapper>
            </Layout>
        </S.Wrapper>
    )
}

export default CharacterPage
