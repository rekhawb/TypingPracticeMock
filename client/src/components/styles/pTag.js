import { keyframes } from "styled-components";
import styled , {css} from "styled-components";

export const animatePosition = keyframes`
0% { opacity: 0; transform: translateY(-100px); }
  25% { opacity: 1; transform: translateY(0px); }
  75% { opacity: 1; transform: translateY(0px); }
  100% { opacity: 0; transform: translateY(-100px); }

`;

export const StyledText1 = styled.p`
color: white;
text-align: center;
background-color:gray
`;



export const StyledText2 = styled.p`
color: black;
text-align: center;
font-size: 2rem;
font-weight:bold
`;




export const StyledText3 = styled.span`
color:orange;
font-weight:bold;
animation-name: ${animatePosition};
 animation-duration: 2s;
 animation-iteration-count: infinite;
`;

export const StyledText4 = styled.p`
color: black;
text-align: center;
font-size: 1rem;
font-weight:bold
`;