import React from 'react';
import * as S from './AlbumPage.styled';
import Layout from '../layout/Layout';
import Header from '../components/Header';
import SpaceBackground from '../assets/images/space-background.png';
import HTMLFlipBook from 'react-pageflip';
import BookCover from '../assets/images/book-cover.png';
import Moon from '../assets/icons/moon.png';
import Title from '../assets/images/title.png';
import { FriendData } from '../constant/friendData';
import Character from '../assets/images/character.png';
import AlbumBackground from '../assets/images/album-background.png';
import Album from '../assets/images/album.png';

const AlbumPage = () => {

    const friendGroup = () => {
        return Array.from({ length: Math.ceil(FriendData.length / 6) }, (_, i) =>
        FriendData.slice(i * 6, i * 6 + 6)
        )
    }

    return (
        <S.Wrapper backgroundImageUrl={SpaceBackground}>
            <Header />
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
                    {friendGroup().map((friendGroup, groungIndex) => (
                        <S.Page key={groungIndex}>
                            <S.FriendProfilePage>
                                {friendGroup.map((friend, friendIndex) => (
                                    <S.FriendProfile key={friendIndex}>
                                        <S.FriendImageWrapper backgroundColor={groungIndex===0 && friendIndex===0}>
                                            <S.FriendImage src={Character}/>
                                        </S.FriendImageWrapper>
                                        <S.FriendName>{friend.name}</S.FriendName>
                                    </S.FriendProfile>
                                ))}
                            </S.FriendProfilePage>
                        </S.Page>
                    ))}
                    <S.Page>
                        <S.AlbumPage backgroundImageUrl={AlbumBackground}>
                            <S.BigAlbum1 src={Album}/>
                            <S.BigAlbum2 src={Album}/>
                        </S.AlbumPage>
                    </S.Page>
                    <S.Page>
                        <S.AlbumPage backgroundImageUrl={AlbumBackground}>
                            <S.SmallAlbum1 src={Album}/>
                            <S.SmallAlbum2 src={Album}/>
                            <S.SmallAlbum3 src={Album}/>
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
