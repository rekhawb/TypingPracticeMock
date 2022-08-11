import { gql } from '@apollo/client';
//token
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const SAVE_PROGRESS = gql`
  mutation saveProgress($progressData:ProgressInput) {
    saveProgress(progressData:$progressData) {
        _id
        username
        email
        previousWork{
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


export const REMOVE_PROGRESS = gql`
  mutation removeProgress($textId:String!) {
    removeProgress(_id:$textId) {
        _id
        username
        email
        previousWork{
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


export const ADD_ORDER = gql`
  mutation addOrder($donations: [ID]!) {
    addOrder(donations: $donations) {
      purchaseDate
      donations {
        _id
        donationTitle
        donationDesc
        donationAmt
      }
    }
  }
`;

