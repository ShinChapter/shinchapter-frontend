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
    width: 100%;
    margin: 0 auto;
    padding: 0 50px;
    min-height: 100%;
    /* background-color: #FFFFFF; */
    overflow-y: auto;
`