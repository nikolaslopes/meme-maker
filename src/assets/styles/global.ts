import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fredoka', sans-serif;
  }

  body {
    background-color: #eee;
  }

  button,
  input {
    outline: 0;
  }

  button {
    cursor: pointer;
  }
`;
