import React from 'react';
import styled from 'styled-components';
import RegularHexagon from '../assets/images/regular-hexagon.png';
import Line from '../assets/images/line1.png';
import Brain from '../assets/icons/brain.png';
import Key from '../assets/icons/key.png';
import Message from '../assets/icons/message.png';

const Information = () => {
    return (
        <Wrapper>
            <Title>INFORMATION</Title>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <Text>20231234</Text>
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <StudentNumber>23</StudentNumber>
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <Text>주전공: AI</Text>
                    <Text>복수전공: 지능형 IoT</Text>
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <Icon src={Brain} />
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <Text>#블랙핑크</Text>
                    <Text>#커피러버</Text>
                    <Text>#늦잠러</Text>
                    <Text>#메타몽</Text>
                </TextWrappr>
                <ImgWrapper imageUrl={RegularHexagon}>
                    <Icon src={Key} />
                </ImgWrapper>
            </CategoryWrapper>
            <CategoryWrapper>
                <TextWrappr>
                    <LineImg1 src={Line} />
                    <LineImg2 src={Line} />
                    <Text>"더이상의 지각은 없다."</Text>
                    <Text>"노지각"</Text>
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
