import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
`

export const LogoWrapper = styled.div`
    width: 50%;
    height: 100vh;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Logo = styled.img`
    width: 130px;
    margin-bottom: 36px;
`

export const ServiceName = styled.h2`
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 25px;
`

export const InformationWrapper = styled.div`
    width: 50%;
    height: 100vh;
    background-color: #2F2F2F;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Title = styled.h1`
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 32px;
`

export const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    flex-direction: column;
    max-width: 100%;
    margin: 30px 0 40px 0;
`

export const Category = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    padding: 0 20px;
`

export const CategoryName = styled.h3`
    font-size: 20px;
    color: #FFFFFF;
`

export const Input = styled.input`
    border-radius: 20px;
    width: 500px;
    height: 60px;
    border: 2px solid #FFFFFF;
    padding: 15px;
    background-color: #2F2F2F;
    max-width: 100%;
    color: #FFFFFF;
    font-size: 16px;
`