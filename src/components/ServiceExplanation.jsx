import React from 'react';
import styled from 'styled-components';
import Hexagon from '../assets/images/hexagon.png';
import Checkbox from '../assets/icons/checkbox.png';

const ServiceExplanation = ({ title, desc }) => {
    const descLines = desc.split('\n');
    
    return (
        <Wrapper>
            <Top>
                <Icon src={Checkbox} />
                <TitleWrapper>
                    <Title>{title}</Title>
                </TitleWrapper>
            </Top>
            <HexagonWrapper backgroundImageUrl={Hexagon}>
                <Desc>{descLines.map((line, index) => (
                        <span key={index}>
                            {line}
                            <div></div>
                        </span>
                    ))}</Desc>
            </HexagonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Top = styled.div`
    background-color: ${({ theme }) => theme.colors.mainColor};
    display: flex;
    align-items: center;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 235px;
    height: 50px;
`

const Icon = styled.img`
    width: 37px;
    margin-left: 10px;
`

const TitleWrapper = styled.div`
    text-align: center;
    width: 100%;
`

const Title = styled.h3`
    font-size: 24px;
    color: #FFFFFF;
`

const HexagonWrapper = styled.div`
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 160px;
`

const Desc = styled.p`
    font-size: 22px;
    color: #FFFFFF;
    text-align: center;
`

export default ServiceExplanation
