
import { gql } from '@apollo/client';


export const GET_ME = gql`
{
    user {
      _id
      username
      email
      previousWork {
        progressId
        passageDesc
        attemptedOn
        charCorrect
        charIncorrect
        timeSpent
        wpm
      }
    }
  }
`;



export const GET_PARAGRAPH = gql`
{
    paragraph {
      _id
      paragraphTitle
      paragraphDesc      
    }
  }
`;


export const GET_ATEXT = gql`
query selectParagraph($_id: String){
  selectParagraph(_id: $_id) {
      _id
      paragraphTitle
      paragraphDesc      
    }
  }
`;
