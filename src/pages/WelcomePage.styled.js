import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

export const BackgroundVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`
export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.79);
    z-index: 0;
`;


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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