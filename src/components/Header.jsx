import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/icons/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => navigate('/home')}>
            <LogoIcon src={Logo}/>
        </Wrapper>
    )
}

const Wrapper = styled.button`
    width: 75px;
    position: absolute;
    left: 50px;
    top: 30px;
    z-index: 10;
    background: none;
    border: none;
    
    @media (max-width: 1500px) {
        display: none;
    }
`

const LogoIcon = styled.img`
    width: 100%;
`

export default Header
