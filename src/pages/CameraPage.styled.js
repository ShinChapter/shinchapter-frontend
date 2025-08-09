import { styled } from 'styled-components';

export const Wrapper = styled.div`
    background-color: #292929;
    max-height: 100%;
`

export const CameraWrapper = styled.div`
    border: 4px solid #FFFFFF;
    background-color: rgba(0, 0, 0, 0.55);
    width: 860px;
    height: 600px;
    margin-top: 50px;
    margin-bottom: 25px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Loading = styled.img`
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`