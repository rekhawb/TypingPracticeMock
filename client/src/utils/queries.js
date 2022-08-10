
import { gql } from '@apollo/client';


export const GET_ME = gql`
{
    user {
      _id
      username
      email
      previousWork{
        _id
        textId
        passageTitle
        attemptedOn
        grossWPM
        netWPM
        accuracy
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
