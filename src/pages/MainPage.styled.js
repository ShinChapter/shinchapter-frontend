import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
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
    height: 100vh;
`

export const Logo = styled.img`
    max-width: 200px;
`

export const Title = styled.img`
    max-width: 770px;
    margin-top: 10px;
`

export const Desc = styled.h2`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 25px;
    color: #FFFFFF;
    margin-bottom: 100px;
    text-align: center;
`