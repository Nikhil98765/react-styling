import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;