import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-image: ${({backgroundImageUrl}) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`