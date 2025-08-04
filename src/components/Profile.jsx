import React, { useState } from 'react';
import styled from 'styled-components';
import Camera from '../assets/icons/camera.png';
import Album from '../assets/icons/album.png';
import Metaverse from '../assets/icons/metaverse.png';
import Character from '../assets/images/character.png';
import CircleLine from '../assets/images/circle-line.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [hasAlbum, setHasAlbum] = useState(false);
    const [name, setName] = useState('사용자');

    return (
        <Wrapper>
            <IconWrapper>
                {hasAlbum ? (
                    <>
                        <button onClick={() => navigate('/album')}>
                            <Icon src={Album} />
                        </button>
                        <button onClick={() => navigate('/')}>
                            <Icon src={Metaverse} />
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate('/')}>
                        <Icon src={Camera} />
                    </button>
                )}
            </IconWrapper>
            <ProfileWrapper>
                <ProfileBlur />
                <CircleLineImg src={CircleLine}/>
                <ProfileImg>
                    <CharacterImg src={Character}/>
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
`

const CharacterImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
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
