import React, { useState } from 'react';
import * as S from './SelectionPage.styled';
import PurpleBackground from '../assets/images/purple-background.png';
import Header from '../components/Header';
import Button from '../components/Button';
import { TotalPhotos } from './../constant/totalPhotoData';
import Check from '../assets/icons/check.png';
import Expansion from '../assets/icons/expansion,.png';
import Back from '../assets/icons/back.png';

const SelectionPage = () => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [previewImage, setPreviewImage] = useState(null); // 확대된 이미지
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // 확대된 이미지가 존재하는지

    const handleSelectPhoto = (index) => {
        setSelectedPhotos((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                if (prev.length >= 5) return prev;
                return [...prev, index];
            }
        })
    }

    const handlePreviewOpen = (event, photo) => {
        event.stopPropagation();
        setPreviewImage(photo);
        setIsPreviewOpen(true);
    }

    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
        setPreviewImage(null);
    }

    return (
        <S.Wrapper backgroundImageUrl={PurpleBackground}>
            <Header />
            <S.TotalImageSection>
                <S.TitleWrapper>
                    <S.Title>원하는 사진을 골라주세요</S.Title>
                    <S.TitleWrapperBlur />
                </S.TitleWrapper>
                {/* 전체 이미지 + 스크롤 넣기 */}
                <S.ImageWrapperContainer>
                    <S.TotalImageWrapper>
                        {TotalPhotos.map((photo, index) => {
                            const isSelected = selectedPhotos.includes(index);
                            return (
                                <S.PhotoWrapper 
                                    key={index} 
                                    onClick={() => handleSelectPhoto(index)}
                                    style={{ position: 'relative' }}
                                >
                                    <S.Photo src={photo} />
                                    {isSelected ? (
                                        <S.Back>
                                            <S.CheckIcon src={Check} />
                                        </S.Back>
                                    ) : (
                                        <S.ExpansionIcon 
                                            src={Expansion} 
                                            onClick={(event) => handlePreviewOpen(event, photo)}
                                        />
                                    )}
                                </S.PhotoWrapper>
                            )
                        })}
                    </S.TotalImageWrapper>
                    <S.Round style={{top: -5, left: -5}}/>
                    <S.Round style={{top: -5, right: -5}}/>
                    <S.Round style={{bottom: -5, left: -5}}/>
                    <S.Round style={{bottom: -5, right: -5}}/>
                </S.ImageWrapperContainer>
            </S.TotalImageSection>
            <S.ChoosenWrapper>
                <S.ChoosenStatus>{selectedPhotos.length}/5</S.ChoosenStatus>
                <S.ChoosenPhotoWrapper>
                    {selectedPhotos.map((index) => (
                        <S.ChoosenPhoto key={index} src={TotalPhotos[index]} />
                    ))}
                    {Array(5 - selectedPhotos.length).fill().map((_, idx) => (
                        <S.NoPhoto key={`empty-${idx}`} />
                    ))}
                </S.ChoosenPhotoWrapper>
                <Button text="DONE"/>
            </S.ChoosenWrapper>
            {isPreviewOpen && (
                <S.PreviewWrapper>
                    <S.PreviewImage src={previewImage}/>
                    <S.BackIcon src={Back} onClick={handlePreviewClose}/>
                </S.PreviewWrapper>
            )}
        </S.Wrapper>
    )
}

export default SelectionPage
