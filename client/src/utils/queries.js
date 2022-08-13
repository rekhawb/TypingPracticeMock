
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
      orders{
        _id
        purchaseDate
        donations{
          _id
          donationTitle
          donationDesc
          donationAmt
        }

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


export const QUERY_CHECKOUT = gql`
  query getCheckout($donations: [ID]!) {
    checkout(donations: $donations) {
      session
    }
  }
`;



export const QUERY_ALL_DONATIONS = gql`
  {
    donation {
      _id
     donationTitle
     donationDesc
    }
  }
`;


