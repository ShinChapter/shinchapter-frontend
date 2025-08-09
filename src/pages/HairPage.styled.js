import styled from "styled-components";

export const Wrapper = styled.div`
    background: linear-gradient(
        to bottom,
        #000000 0%,
        #432759 50%,
        #000000 100%
    );
    width: 100%;
    height: 100vh;
`

export const RowRapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`

export const StylingWrapper = styled.div`
    width: 50%;
    height: 100vh;
`

export const TitleWrapper = styled.div`
    width: 500px;
    height: 15px;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: relative;
    margin: 20px 0;
`

export const Title = styled.h2`
    color: #FFFFFF;
    font-size: 20px;
    ${({ theme }) => theme.fonts.PressStart2P};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const FaceWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
`

export const FaceImage = styled.img`
    width: 250px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
`

export const HairWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ColorOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`

export const Color = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    cursor: pointer;
    border: 3px solid ${({$isSelected}) => $isSelected ? '#B87DE9' : 'none'};
    box-shadow: ${({$isSelected}) => $isSelected ? '0 0 4px #B87DE9' : 'none'};
`

export const styleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyleOption = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    justify-self: center;
`

export const Style = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 20px;
    cursor: pointer;
    border: 4px solid ${({ $isSelected }) => ($isSelected ? '#B87DE9' : '#98A2B3')};
`

export const OutfitWrapper = styled.div`
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const OutfitImage = styled.img`
    height: 600px;
`

export const Loading = styled.img`
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`