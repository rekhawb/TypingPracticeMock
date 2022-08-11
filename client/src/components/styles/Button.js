
import styled, {css} from "styled-components"
import {ThemeProvider} from 'styled-components';
export const Button = styled.button`
background: Orange;
border-radius: 3px;
border: none;
color: black;
`;



export const Button1 = styled.button`
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 20px;
  background:white

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.main};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button1.defaultProps = {
  theme: {
    main: "black"
  }
}