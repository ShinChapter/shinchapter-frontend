import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    z-index: 0;
`

export const TotalImageSection = styled.div`
    height: 100vh;
    border: 5px solid red;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`

export const TotalImageWrapper = styled.div`
    height: 600px;
    border: 2px solid yellow;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow-y: auto;
    -ms-overflow-style: none;
    justify-items: center;
`


export const TitleWrapper = styled.div`
    width: 650px;
    height: 90px;
    border-radius: 20px;
    position: relative;
`

export const TitleWrapperBlur = styled.div`
    width: 650px;
    height: 90px;
    border-radius: 20px;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.mainColor};
    filter: blur(20px);
    z-index: 0;
`

export const Title = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    font-size: 35px;
    color: #FFFFFF;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.76);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`

export const ChoosenWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 5px solid yellow;
    gap: 20px;
    margin: 0 60px;
`

export const ChoosenStatus = styled.h2`
    ${({ theme }) => theme.fonts.PressStart2P};
    font-size: 40px;
    color: #FFFFFF;
`

export const ChoosenPhotoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
`

export const ChoosenPhoto = styled.img`
    width: 150px;
    height: 90px;
    object-fit: cover;
`

export const NoPhoto = styled.div`
    width: 150px;
    height: 90px;
    background-color: #FFFFFF;
`