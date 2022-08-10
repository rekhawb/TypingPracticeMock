import React  from 'react';
import { render } from 'react-dom';
import styled,{createGlobalStyle} from 'styled-components'
import {ThemeProvider} from 'styled-components';
import Wrapper from './styles/Wrapper';
import { StyledHeader, Nav, Logo } from './styles/Header';
import {StyledFooter} from './styles/Footer';
import { Container } from './styles/Container';
import { Flex } from './styles/Flex';
import  {Title} from './styles/Title'
import { StyledText1,StyledText2,StyledText3,animatPosition } from './styles/pTag';
import { StyledCard } from './styles/Card';
import { UList} from './styles/List';
import Typed from 'react-typed'


const Home =() =>{

  const StyledTextarea = styled.textarea`
  width: 100%;
`;


return(
  <>

      <Container>
        <Nav>
       
        </Nav>
         
        <Flex>
          <div>
            <StyledHeader> FlashKeys.com - Complete a typing test in 60 seconds!</StyledHeader>

            <StyledText2>
              Impress your family and friends by learning how to type faster.
              </StyledText2>
            
          </div>
        </Flex>
      </Container>
  <Title>
  <Typed
      strings={[
            "You're a legend in your own mind.            ",
            "The journey of a thousand miles begins with one step.",
            "You miss 100 percent of the shots you never take."
          ]}
          typeSpeed={150}
          backSpeed={100}
          loop
        />

  </Title>
      <Container>
      <Flex>
      <StyledCard>

      <UList>
          <li>
            <StyledText2>Why Choose Us?</StyledText2>
            </li>
            <li>
            Dozens of <StyledText3>FREE </StyledText3>lessons to choose from.
            </li>
            <li>Lessons for all ages.</li>
            <li><StyledText3>FREE </StyledText3>account set up to track day-to-day progress.</li>
            </UList>

</StyledCard>
      </Flex>
        <Flex>
     <StyledCard>
        <UList>
          <li>
            <StyledText2>Tips for faster typing skills</StyledText2>
            </li>
            <li>
            Train yourself to look only at the screen as you type.
            </li>
            <li>Focus on accuracy rather than speed</li>
            <li>Learn some keyboard shortcuts</li>
            </UList>
            </StyledCard>
        </Flex>

        

        <StyledText1>@ Rekha 2022</StyledText1>
      </Container>
  </>

);
};

export default Home;


 
// Use Title and Wrapper like any other React component – except they're styled!
