import React from 'react';
import styled from 'styled-components';

const Button = ({ text }) => {
    return (
        <Wrapper>
            {text}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    background-color: rgba(0, 0, 0, 0.35);
    border: 1px solid #FFFFFF;
    border-radius: 35px;
    ${({ theme }) => theme.fonts.PressStart};
    font-size: 35px;
    height: 85px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    ${({ theme }) => theme.fonts.PressStart2P};

    &:hover {
        background-color: rgba(28, 28, 28, 0.35);
        cursor: pointer;
        transition: all 0.2s ease;
    }
`

export default Button
