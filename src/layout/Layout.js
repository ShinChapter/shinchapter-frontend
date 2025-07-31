import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
    return (
        <Wrapper>{ children }</Wrapper>
    )
}

export default Layout;

const Wrapper = styled.div`
    position: relative;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 50px;
    min-height: 100vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`