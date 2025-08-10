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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`

export const ImageWrapperContainer = styled.div`
    position: relative;
    height: 600px;
`

export const TotalImageWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow-y: auto;
    -ms-overflow-style: none;
    justify-items: center;
    height: 600px;
    padding: 0 40px;
    width: auto;
    grid-gap: 40px 60px;
    border-top: 2px solid ${({ theme }) => theme.colors.mainColor};
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};

    &::-webkit-scrollbar{
        display:none;
    }
`

export const PhotoWrapper = styled.div`
    width: 200px;
    height: 120px;
`

export const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    cursor: pointer;
`

export const ExpansionIcon = styled.img`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 6px;
    right: 4px;
    cursor: pointer;
`

export const Back = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 120px;
    position: absolute;
    top: 0;
`

export const CheckIcon = styled.img`
    width: 90px;
    height: 90px;
`

export const Round = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.mainColor};
    z-index: 2;
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

export const PreviewWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 10;
`

export const PreviewImage = styled.img`
    width: 1000px;
    height: 600px;
    object-fit: cover;
`

export const BackIcon = styled.img`
    width: 64px;
    height: 64px;
    position: absolute;
    top: 36px;
    left: 58px;
    cursor: pointer;
`