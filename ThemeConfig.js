import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#333",
  btnBody: "#333",
  btnText: "#FFF",
};

export const darkTheme = {
  body: "#363637",
  text: "#fafafa",
  btnBody: "#fff",
  btnText: "#333",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  
  .btn{
    background: ${({ theme }) => theme.btnBody};
    color: ${({ theme }) => theme.btnText};
  }
  
  `;
