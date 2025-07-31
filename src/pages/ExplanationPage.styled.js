import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #292929;
    max-height: 100%;
`

export const SchoolShape = styled.img`
    width: 1350px;
    margin-bottom: 30px;
    height: 640px;
`

export const Title = styled.h2`
    font-size: 32px;
    ${({ theme }) => theme.fonts.PressStart2P};
    color: #FFFFFF;
    position: absolute;
    top: 70px;
`

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    position: absolute;
`

export const Example = styled.img`
    width: 480px;
`

export const ExplanationWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px 10px;
`