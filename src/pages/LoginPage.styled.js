import styled from "styled-components";


export const Wrapper = styled.div`
    width: 100%;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const SchoolShape = styled.img`
    width: 1200px;
    margin-bottom: 40px;
`

export const Title = styled.h2`
    font-size: 32px;
    ${({ theme }) => theme.fonts.PressStart2P};
    color: #FFFFFF;
    position: absolute;
    top: 150px;
`

export const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: absolute;
`

export const Icon = styled.img`
    width: 60px;
`

export const Desc = styled.h2`
    font-size: 55px !important;
    ${({ theme }) => theme.fonts.IBMBold};
    color: #FFFFFF;
`