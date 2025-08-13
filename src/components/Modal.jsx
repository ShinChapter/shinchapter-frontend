import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../apis/axiosInstance';

const Modal = ({ name, characterImage, groupId, onClose }) => {

    const handleRespond = async (accept) => {
        try {
            const response = await axiosInstance.post('/group/respond', {
                group_id: groupId,
                accept: accept
            });
            console.log('그룹 초대 응답', response.data.message);
        } catch(error) {
            console.log('그룹 초대 응답 실패', error.response);
        } finally {
            if (onClose) onClose();
        }
    }
    
    return (
        <Wrapper>
            <ProfileWrapper>
                <ProfileImage src={characterImage}/>
            </ProfileWrapper>
            <Text>
                {name}님이 그룹에 초대하였습니다.
            </Text>
            <ButtonWrapper>
                <RejectButton onClick={() => handleRespond(false)}>거절</RejectButton>
                <AcceptButton onClick={() => handleRespond(true)}>수락</AcceptButton>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 510px;
    padding: 32px;
    border-radius: 16px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
`

const ProfileWrapper = styled.div`
    background-color: #FFEA9F;
    margin-bottom: 24px;
    width: 106px;
    height: 106px;
    border-radius: 50%;
    overflow: hidden;
`

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    scale: 2.5;
    transform-origin: top;
    padding-top: 2px;
`

const Text = styled.h3`
    font-size: 24px;
    ${({ theme }) => theme.fonts.IBMSemiBold};
    margin-bottom: 40px;
    font-size: 24px;
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const RejectButton = styled.button`
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
    height: 48px;
    width: 155px;
    color: ${({ theme }) => theme.colors.mainColor};
    ${({ theme }) => theme.fonts.IBMSemiBold};
    font-size: 18px;
    border-radius: 8px;
    background-color: #FFFFFF;

    &:hover {
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
    }
`

const AcceptButton = styled.button`
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
    height: 48px;
    width: 155px;
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.IBMSemiBold};
    font-size: 18px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.mainColor};

    &:hover {
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
    }
`


export default Modal
