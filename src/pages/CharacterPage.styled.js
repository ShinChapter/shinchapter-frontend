import styled from "styled-components";

export  const Wrapper = styled.div`
    background-color: #292929;
    max-height: 100%;
`

export const RowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
`

export const CharacterWrapper = styled.div`
    position: relative;
    height: 750px;
    width: 500px;
`

export const Light = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    height: 750px;
    width: 500px;
`

export const Character = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
    z-index: 2;
`

export const RightWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`

export const BlurImg = styled.img`
    position: absolute;
    width: 635px;
    height: 395px;
    top: -25px;
`

export const DescWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.48);
    border: 2px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 20px;
    margin-bottom: 100px;
    width: 600px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Desc = styled.p`
    color: #FFFFFF;
    display: flex;
    font-size: 40px;
`

export const Name = styled.p`
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 40px;
    margin-left: 10px;
    margin-right: 5px;
`