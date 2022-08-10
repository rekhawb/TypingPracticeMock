import styled , {css} from "styled-components";

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  border: none;
  border-radius: 3px;
`;