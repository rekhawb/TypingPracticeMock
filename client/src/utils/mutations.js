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
          progressId
          passageTitle
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


export const REMOVE_PROGRESS = gql`
  mutation removeProgress($progressId:ID!) {
    removeProgress(progressId:$progressId) {
        _id
        username
        email
        previousWork{
          progressId
          passageTitle
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

