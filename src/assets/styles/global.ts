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

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    transition: all 0.2s ease-in;

    &:hover {
      background: #4395d8;
    }
  }
`;
