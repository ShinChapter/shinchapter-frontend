import React, { useState } from 'react';
import styled from 'styled-components';
import UserPlus from '../assets/icons/user-plus.png';
import Send from '../assets/icons/send.png';
import Line from '../assets/images/line2.png';
import Character from '../assets/images/character.png';
import { FriendData } from '../constant/friendData';

const Friend = () => {
    const [mode, setMode] = useState('list'); // list, group, invite 중 하나
    const [groupName, setGroupName] = useState('');
    const [FriendStudentNumber, setFriendStudentNumber] = useState();

    const colors = ['#FFDBEE', '#D0FFFA', '#E4C5FF', '#FFFED3', '#B3B2B2', '#FFFFFF'];
    
    return (
        <Wrapper>
            {mode==="list" ? (
                <TopWrapper>
                    <Title>FRIENDS</Title>
                    <UserIconWrapper onClick={() => setMode('group')}>
                        <Icon src={UserPlus} />
                    </UserIconWrapper>
                </TopWrapper>
            ) : 
            mode==="group" ? (
                <TopWrapper>
                    <Category>그룹명: </Category>
                    <Input />
                    <SendIconWrapper onClick={() => setMode('invite')}>
                        <Icon src={Send} />
                    </SendIconWrapper>
                </TopWrapper>
            ) : (
                <TopWrapper>
                    <Category>학번: </Category>
                    <Input />
                    <SendIconWrapper onClick={() => setMode('list')}>
                        <Icon src={Send} />
                    </SendIconWrapper>
                </TopWrapper>
            )}
            <FriendListWrapper>
                <LineImg1 src={Line} />
                <LineImg2 src={Line} />
                <FriendList>
                    {FriendData.map((friend, index) => (
                        <Member>
                            <MemberBackground style={{ backgroundColor: colors[index % colors.length] }}>
                                <MembeImg src={Character}/>
                            </MemberBackground>
                            <MemberName>{friend.name}</MemberName>
                        </Member>
                    ))}
                </FriendList>
            </FriendListWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 60px;
    width: 100%;
`

const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    height: 60px;
`

const Title = styled.h2`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 20px;
    color: #FFFFFF;
`

const Category = styled.h2`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 20px;
    color: #FFFFFF;
    width: 75px;
    text-align: center;
`

const UserIconWrapper = styled.button`
    width: 60px;
    height: 60px;
    margin-left: 12px;
`

const SendIconWrapper = styled.button`
    width: 30px;
    height: 30px;
    margin-left: 12px;
`

const Icon = styled.img`
    width: 100%;
    height: 100%;
`

const Input = styled.input`
    border: 1px solid #FFFFFF;
    border-top: none;
    border-right: none;
    border-left: none;
    background: none;
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.PressStart2P};
    width: 200px;
    height: 70%;
    font-size: 20px;
`

const FriendListWrapper = styled.div`
    height: 400px;
    position: relative;
    width: 85%;
    padding: 6px 0;
`

const FriendList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-y: auto;
    -ms-overflow-style: none;
    height: 380px;
    margin-top: 6px;
    grid-gap: 15px 0 15px 0;
    justify-items: center;

    &::-webkit-scrollbar{
        display:none;
    }
`

const LineImg1 = styled.img`
    position: absolute;
    width: 100%;
    height: 12px;
`

const LineImg2 = styled.img`
    position: absolute;
    width: 100%;
    height: 12px;
    bottom: 0;
`

const Member = styled.div`

`

const MemberBackground = styled.div`
    width: 120px;
    height: 150px;
    border-radius: 20px;
`

const MembeImg = styled.img`
    width: 120px;
    height: 150px;
    border-radius: 20px;
    object-fit: cover;
    object-position: top;
`

const MemberName = styled.p`
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 32px;
`

export default Friend
