import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box;
}

html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,
aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,
nav,output,ruby,section,summary,time,mark,audio,video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 140%;
    letter-spacing: -2.5%;
    font-family: ${({ theme }) =>
    theme.fonts.default["font-family"]};
}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,
nav,section {
    display: block;
}
body {
    line-height: 1;
}
ol,
ul {
    list-style: none;
}
blockquote,
q {
    quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
    content: "";
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

button {
    background: inherit; 
    border:none; 
    border-radius:0;
    padding:0; 
    cursor:pointer;
    font-family: var(--mainfont);
    line-height: 150%;
}

a {
    color: inherit;
    text-decoration: none;
    outline: none;
}

a:visited {
    text-decoration: none;
    color: inherit;
}

input {
    -webkit-appearance: none; /* Safari and Chrome */
        -moz-appearance: none; /* Firefox */
            appearance: none;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
}

input:focus {
    outline: none;
}

@font-face {
    font-family: 'Galmuri14';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri14.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'IBMPlexSansKR-Medium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'IBMPlexSansKR-SemiBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-SemiBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'IBMPlexSansKR-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GrandifloraOne';
    src: url('../../fonts/GrandifloraOne-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Galmuri7';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url('https://cdn.jsdelivr.net/gh/fonts-archive/Galmuri7/Galmuri7.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/fonts-archive/Galmuri7/Galmuri7.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/fonts-archive/Galmuri7/Galmuri7.otf') format('opentype'),
        url('https://cdn.jsdelivr.net/gh/fonts-archive/Galmuri7/Galmuri7.ttf') format('truetype');
}
`;

export default GlobalStyle;