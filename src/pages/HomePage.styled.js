import { styled } from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`
export const BackgroundVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

export const SchoolShapeWrapper = styled.div`
    width: 1400px;
    height: 100vh;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 65px;
`

export const Title = styled.h1`
    font-size: 28px;
    ${({ theme }) => theme.fonts.PressStart2P};
    color: #FFFFFF;
`

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 90px 50px
`