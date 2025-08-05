import { styled } from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`

export const IconWrapper = styled.div`
    position: absolute;
    top: 30px;
    right: 50px;
    z-index: 10;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80px;
`

export const CameraIcon = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
    margin-bottom: 30px;
`

export const ChangeIcon = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
`

export const BuildingIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    flex-direction: column;
    border-radius: 10px;
    gap: 15px;
    width: 80px;
    padding: 18px 0;
`

export const UpIcon = styled.img`
    width: 50px;
    cursor: pointer;
`

export const BuildingIcon = styled.img`
    width: 60px;
    height: 60px;
    cursor: pointer;
`