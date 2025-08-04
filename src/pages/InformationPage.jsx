import React, { useState } from 'react';
import * as S from './InformationPage.styled';
import Button from './../components/Button';
import PurpleGradation from '../assets/images/purple-gradation.png';
import Logo from '../assets/icons/logo.png';

const InformationPage = () => {
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
                .filter(tag => tag.startsWith('#') && tag.length > 1)
                .slice(0, 4);
            console.log('해시태그:', tags);
        } catch(error) {
            console.log(error);
        }
    }


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
