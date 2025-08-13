import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Camera from '../assets/icons/camera.png';
import Album from '../assets/icons/album.png';
import Metaverse from '../assets/icons/metaverse.png';
import Character from '../assets/images/character.png';
import CircleLine from '../assets/images/circle-line.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

const Profile = () => {
    const navigate = useNavigate();

    const [hasAlbum, setHasAlbum] = useState(false);
    const [name, setName] = useState('사용자');
    const [characterImage, setCharacterImage] = useState();
    const [groupId, setGroupId] = useState();

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

    const handleAlbum = async () => {
        try {
            const response = await axiosInstance.get('/album/final-list');
            if (response.data.images > 0) {
                setHasAlbum(true);
            } else {
                setHasAlbum(false);
            }
        } catch(error) {
            console.log('앨범 조회 실패', error.response);
        }
    }

    const handleNavigation = () => {
        navigate('/metaverse');
    }

    useEffect(() => {
        handleName();
        handleCharacter();
        handleAlbum();
    }, [])

    return (
        <Wrapper>
            <IconWrapper>
                {hasAlbum ? (
                    <>
                        <button onClick={() => navigate('/album')}>
                            <Icon src={Album} />
                        </button>
                        <button onClick={handleNavigation}>
                            <Icon src={Metaverse} />
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate('/metaverse')}>
                        <Icon src={Camera} />
                    </button>
                )}
            </IconWrapper>
            <ProfileWrapper>
                <ProfileBlur />
                <CircleLineImg src={CircleLine}/>
                <ProfileImg>
                    <CharacterImg src={characterImage}/>
                </ProfileImg>
            </ProfileWrapper>
            <NameWrapper>
                <NameBlur />
                <Name>{name}</Name>
            </NameWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 120px;
    margin-top: 30px;
`


const Icon = styled.img`
    width: 50px;
`

const ProfileWrapper = styled.div`
    position: relative;
    margin-top: 20px;
`

const ProfileBlur = styled.div`
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.mainColor};
    filter: blur(20px);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
`

const CircleLineImg = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 320px;
`

const ProfileImg = styled.div`
    width: 320px;
    height: 320px;
    background-color: #FFFFFF;
    border-radius: 50%;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
`

const CharacterImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    scale: 2.5;
    transform-origin: top;
`

const NameWrapper = styled.div`
    position: relative;
    margin-top: 20px;
`

const NameBlur = styled.div`
    width: 95px;
    height: 35px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.mainColor};
    filter: blur(20px);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
`

const Name = styled.p`
    color: #FFFFFF;
    font-size: 30px;
    position: relative;
`


export default Profile
