const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    previousWork: [Progress]
  }

  type Paragraph{
    _id: ID
    paragraphTitle:String
    paragraphDesc:String
  }

type Progress {
    progressId: ID
    paragraphTitle: [String]
    paragraphDesc:String
    attemptedOn:String
    charCorrect:String
    charIncorrect:String
    timeSpent:String
    wpm:String
}


type Auth {
  token: ID!
  user: User
}

  input ProgressInput {
    progressId: String!
    paragraphTitle: String
    paragraphDesc:String
    attemptedOn:String
    charCorrect:String
    charIncorrect:String
    timeSpent:String
    wpm:String
}


  type Query {
    user:User
    paragraph: [Paragraph]
    selectParagraph(_id:String):Paragraph
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveProgress(progressData: ProgressInput): User
    removeProgress(progressId:ID!):User    
  }


  `;

  module.exports = typeDefs;