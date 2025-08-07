import React, { useState } from 'react';
import * as S from './SelectionPage.styled';
import PurpleBackground from '../assets/images/purple-background.png';
import Header from '../components/Header';
import Button from '../components/Button';
import { Photos } from '../constant/photoData';
import { TotalPhotos } from './../constant/totalPhotoData';
import LongLine from '../assets/images/long-line.png';
import Check from '../assets/icons/check.png';

const SelectionPage = () => {
    const [selectedImageCount, setSelectedImageCount] = useState(3);

    return (
        <S.Wrapper backgroundImageUrl={PurpleBackground}>
            <Header />
            <S.TotalImageSection>
                <S.TitleWrapper>
                    <S.Title>원하는 사진을 골라주세요</S.Title>
                    <S.TitleWrapperBlur />
                </S.TitleWrapper>
                {/* 전체 이미지 + 스크롤 넣기 */}
                <S.TotalImageWrapper>
                    
                </S.TotalImageWrapper>
            </S.TotalImageSection>
            <S.ChoosenWrapper>
                <S.ChoosenStatus>{selectedImageCount}/5</S.ChoosenStatus>
                <S.ChoosenPhotoWrapper>
                    {Photos.map((photo, index) => (
                        <S.ChoosenPhoto src={photo} />
                    ))}
                    {Array(5 - Photos.length).fill().map(() => (
                        <S.NoPhoto/>
                    ))}
                </S.ChoosenPhotoWrapper>
                <Button text="DONE"/>
            </S.ChoosenWrapper>
        </S.Wrapper>
    )
}

export default SelectionPage
