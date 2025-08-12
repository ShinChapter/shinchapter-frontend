import React, { useEffect, useState } from 'react';
import * as S from './SelectionPage.styled';
import PurpleBackground from '../assets/images/purple-background.png';
import Header from '../components/Header';
import Button from '../components/Button';
import Check from '../assets/icons/check.png';
import Expansion from '../assets/icons/expansion,.png';
import Back from '../assets/icons/back.png';
import axiosInstance from './../apis/axiosInstance';

const SelectionPage = () => {
    const [totalPhoto, setTotalPhoto] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [previewImage, setPreviewImage] = useState(null); // 확대된 이미지
    const [isPreviewOpen, setIsPreviewOpen] = useState(false); // 확대된 이미지가 존재하는지

    const handlePhoto = async () => {
        try {
            const response = await axiosInstance.get('/album/list');
            console.log('촬영된 사진', response.data);
            setTotalPhoto(response.data.images || []);
        } catch (error) {
            console.log('촬영된 사진 가져오기 실패', error.response);
            setTotalPhoto([]);
        }
    };

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

    const sendSelectedPhoto = async () => {
        if (selectedPhotos.length !== 5) {
            alert('사진 5장을 선택해주세요.');
            return;
        }
        try {
            const formData = FormData();
            selectedPhotos.forEach((index) => {
                formData.append('files', totalPhoto[index]);
            });
            const response = await axiosInstance.post('/album/save-selected', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('앨범에 넣을 사진', response.data);
        } catch(error) {
            console.log('앨범에 넣을 사진 전송 실패', error.response);
        }
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

    useEffect(() => {
        handlePhoto();
    }, [])

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
                        {totalPhoto.map((photo, index) => {
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
                        <S.ChoosenPhoto key={index} src={totalPhoto[index]} />
                    ))}
                    {Array(5 - selectedPhotos.length).fill().map((_, idx) => (
                        <S.NoPhoto key={`empty-${idx}`} />
                    ))}
                </S.ChoosenPhotoWrapper>
                <Button text="DONE" onPress={sendSelectedPhoto}/>
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
