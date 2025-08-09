import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RegularHexagon from '../assets/images/regular-hexagon.png';
import Line from '../assets/images/line1.png';
import Brain from '../assets/icons/brain.png';
import Key from '../assets/icons/key.png';
import Message from '../assets/icons/message.png';
import axiosInstance from './../apis/axiosInstance';

const Information = () => {
    const [studentNumber, setStudentNumber] = useState();
    const [year, setYear] = useState();
    const [major, setMajor] = useState();
    const [doubleMajor, setDoubleMajor] = useState();
    const [hashtags, setHashtags] = useState();
    const [introduction, setIntroduction] = useState();

    const handleInformation = async () => {
        try {
            const response = await axiosInstance.get('/me');
            console.log('정보 조회', response);
            setStudentNumber(response.data.email);
            const emailNumber = response.data.email.match(/^(\d{8})/);
            setStudentNumber(emailNumber[0]);
            setYear(emailNumber[0].substring(2, 4));
            setMajor(response.data.major);
            setDoubleMajor(response.data.minor);
            setHashtags(response.data.hashtags);
            setIntroduction(response.data.introduction);
        } catch(error) {
            console.log('정보 조회 실패', error);
        }
    }

    useEffect(() => {
        handleInformation();
    }, [])

    return (
        <Wrapper>
            <Title>INFORMATION</Title>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <Text>{studentNumber}</Text>
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <StudentNumber>{year}</StudentNumber>
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <Text>주전공: {major}</Text>
                    {doubleMajor && (
                        <Text>복수전공: {doubleMajor}</Text>
                    )}
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <Icon src={Brain} />
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    {hashtags && (
                        hashtags.map((hashtag, index) => (
                            <Text key={index}># {hashtag}</Text>
                        ))
                    )}
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <Icon src={Key} />
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <LineImg2 src={Line} />
                    <Text>{introduction}</Text>
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <Icon src={Message} />
                </ImgWrapper>
            </CategoryWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 60px;
    width: 100%;
`

const Title = styled.h2`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 20px;
    color: #FFFFFF;
    height: 60px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`

const CategoryWrapper = styled.div`
    display: flex;
    position: relative;
    width: 85%;
`

const LineImg1 = styled.img`
    width: 256px;
    height: 12px;
    position: absolute;
    top: 0;
`

const LineImg2 = styled.img`
    width: 256px;
    height: 12px;
    position: absolute;
    bottom: 0;
`

const TextWrappr = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px 10px 18px 10px;
    flex-wrap: wrap;
`

const Text = styled.p`
    ${({ theme }) => theme.fonts.IBMSemiBold};
    font-size: 20px;
    color: #FFFFFF;
    height: 30px;
    margin: 0 5px;
`

const ImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    background-image: ${({imageUrl}) => `url(${imageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StudentNumber = styled.p`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 24px;
    color: #FFFFFF;
`

const Icon = styled.img`
    width: 50px;
    height: 50px;
`

export default Information
