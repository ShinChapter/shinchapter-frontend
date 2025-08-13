import React, { useEffect, useState } from 'react';
import * as S from './AlbumPage.styled';
import Layout from '../layout/Layout';
import SpaceBackground from '../assets/images/space-background.png';
import HTMLFlipBook from 'react-pageflip';
import BookCover from '../assets/images/book-cover.png';
import Moon from '../assets/icons/moon.png';
import Title from '../assets/images/title.png';
import { FriendData } from '../constant/friendData';
import Character from '../assets/images/character.png';
import AlbumBackground from '../assets/images/album-background.png';
import Album from '../assets/images/album.png';
import Share from '../assets/icons/share.png';
import axiosInstance from './../apis/axiosInstance';
import { useParams, useLocation } from 'react-router-dom';

const AlbumPage = () => {
    const { groupId } = useParams();
    const [friends, setFriends] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const location = useLocation();

    const friendGroup = () => {
        return Array.from({ length: Math.ceil(FriendData.length / 6) }, (_, i) =>
        friends.slice(i * 6, i * 6 + 6)
        )
    }

    const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
        .then(() => alert('링크가 복사되었습니다!'))
        .catch((err) => alert('링크 복사에 실패했습니다.'));
    }

    const getSelectedPhoto = async () => {
        try {
            const response = await axiosInstance.get(`/public/group/${groupId}/album2d`);
            console.log('2D 앨범 조회', response.data);
            setFriends(response.data.members);
            setSelectedPhotos(response.data.photos);
        } catch(error) {
            console.log('2D 앨범 조회 실패', error.response);
        }
    }

    useEffect(() => {
        getSelectedPhoto();
    }, [])

    return (
        <S.Wrapper backgroundImageUrl={SpaceBackground}>
            <S.ShareIconWrapper onClick={() => handleCopyLink(window.location.href)}>
                <S.ShareIcon src={Share} />
            </S.ShareIconWrapper>
            <Layout>
                <HTMLFlipBook
                    width={610}
                    height={750}
                    size="fixed"
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    drawShadow={true}
                    flippingTime={700}
                    usePortrait={false}
                >
                    {/* 표지 */}
                    <S.Page>
                        <S.BookCoverWrapper backgroundImageUrl={BookCover}>
                            <S.MoonIcon src={Moon} />
                            <S.BookCoverTop>
                                <S.TitleImage src={Title} />
                                <S.Desc>성신이 그대를 비추고, 그대가 세상을 밝히리라</S.Desc>
                            </S.BookCoverTop>
                            <S.SchoolName>성신여자대학교</S.SchoolName>
                        </S.BookCoverWrapper>
                    </S.Page>
                    {/* 친구 목록 */}
                    {friendGroup().map((friends, groungIndex) => (
                        <S.Page key={groungIndex}>
                            <S.FriendProfilePage>
                                {friends.map((friend, friendIndex) => (
                                    <S.FriendProfile key={friendIndex}>
                                        <S.FriendImageWrapper backgroundColor={groungIndex===0 && friendIndex===0}>
                                            <S.FriendImage src={friend.preview_url}/>
                                        </S.FriendImageWrapper>
                                        <S.FriendName>{friend.name}</S.FriendName>
                                    </S.FriendProfile>
                                ))}
                            </S.FriendProfilePage>
                        </S.Page>
                    ))}
                    <S.Page>
                        <S.AlbumPage backgroundImageUrl={AlbumBackground}>
                            <S.BigAlbum1 src={selectedPhotos[0]}/>
                            <S.BigAlbum2 src={selectedPhotos[1]}/>
                        </S.AlbumPage>
                    </S.Page>
                    <S.Page>
                        <S.AlbumPage backgroundImageUrl={AlbumBackground}>
                            <S.SmallAlbum1 src={selectedPhotos[2]}/>
                            <S.SmallAlbum2 src={selectedPhotos[3]}/>
                            <S.SmallAlbum3 src={selectedPhotos[4]}/>
                            <S.AlbumTitleBlur />
                            <S.AlbumTitle>SHINCHAPTER</S.AlbumTitle>
                        </S.AlbumPage>
                    </S.Page>
                </HTMLFlipBook>
            </Layout>
        </S.Wrapper>
    );
};

export default AlbumPage;
