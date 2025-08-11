import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPlus from '../assets/icons/user-plus.png';
import Send from '../assets/icons/send.png';
import Line from '../assets/images/line2.png';
import Character from '../assets/images/character.png';
import { FriendData } from '../constant/friendData';
import axiosInstance from './../apis/axiosInstance';

const Friend = () => {
    const [mode, setMode] = useState('list'); // list, group, invite 중 하나
    const [hasGroup, isHasGroup] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState();
    const [friendStudentNumber, setFriendStudentNumber] = useState();
    const [groupMember, setGroupMember] = useState([]); // 그룹 멤버 전체

    const colors = ['#FFDBEE', '#D0FFFA', '#E4C5FF', '#FFFED3', '#B3B2B2', '#FFFFFF'];
    
    const getGroup = async () => {
        try {
            const response = await axiosInstance.get('/album-group/my');
            setGroupMember(response.data.members);
            console.log('그룹 존재함', response.data);
            isHasGroup(true);
        } catch(error) {
            if (error.status===404) {
                isHasGroup(false);
                console.log('그룹 없음');
            } else {
                console.log('내 그룹 목록 조회 실패', error.response);
            }
        }
    }

    const handleMode = () => {
        if (hasGroup) {
            setMode('invite');
        } else {
            setMode('group');
        }
    }

    const handleGroupName = async () => {
        console.log(groupName);
        try {
            const response = await axiosInstance.post('/group/create', {
                name: groupName,
            })
            console.log('그룹 생성', response);
            setGroupName('');
            isHasGroup(true);
            setGroupId(response.data.group_id);
            setMode('invite');
            setGroupName("");
        } catch(error) {
            console.log('그룹 생성 실패', error);
            setMode('list');
        }
    }

    const handleGroupMember = async () => { // 친구 추가
        try {
            console.log(friendStudentNumber);
            const response = await axiosInstance.post('/group/invite', {
                student_id: friendStudentNumber,
            })
            console.log('친구 초대', response);
            setMode('list');
            alert('초대가 완료되었습니다.');
        } catch(error) {
            if (error.status===400) {
                alert('이미 다른 그룹에 속해 있는 사용자는 초대할 수 없습니다.')
            } else if (error.status===404) {
                alert('해당 사용자를 찾을 수 없습니다.')
            }
            console.log('친구 초대 실패', error);
            setMode('list');
        }
    }

    useEffect(() => {
        getGroup();
    }, [])
    
    return (
        <Wrapper>
            {mode==="list" ? (
                <TopWrapper>
                    <Title>FRIENDS</Title>
                    <UserIconWrapper onClick={handleMode}>
                        <Icon src={UserPlus} />
                    </UserIconWrapper>
                </TopWrapper>
            ) : 
            mode==="group" ? (
                <TopWrapper>
                    <Category>그룹명: </Category>
                    <Input 
                        onChange={(event)=>setGroupName(event.target.value)}
                    />
                    <SendIconWrapper onClick={handleGroupName}>
                        <Icon src={Send} />
                    </SendIconWrapper>
                </TopWrapper>
            ) : (
                <TopWrapper>
                    <Category>학번: </Category>
                    <Input 
                        onChange={(event)=>setFriendStudentNumber(event.target.value)}
                    />
                    <SendIconWrapper onClick={handleGroupMember}>
                        <Icon src={Send} />
                    </SendIconWrapper>
                </TopWrapper>
            )}
            <FriendListWrapper>
                <LineImg1 src={Line} />
                <LineImg2 src={Line} />
                <FriendList>
                    {groupMember.map((friend, index) => (
                        (index!==0 && friend.accepted) && (
                            <Member>
                                <MemberBackground style={{ backgroundColor: colors[index % colors.length] }}>
                                    <MembeImg src={Character}/>
                                </MemberBackground>
                                <MemberName>{friend.name}</MemberName>
                            </Member>
                        )
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
