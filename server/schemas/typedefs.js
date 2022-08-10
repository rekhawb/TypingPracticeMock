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
  _id:String
    textId:String
    passageTitle:String
    attemptedOn:String
    grossWPM:String
    netWPM:String
    accuracy:String
}


type Auth {
  token: ID!
  user: User
}

  input ProgressInput {
    textId:String
    passageTitle:String
    attemptedOn:String
    grossWPM:String
    netWPM:String
    accuracy:String
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
    removeProgress(_id:String):User    
  }


  `;

  //removeProgress(textId:String!):User   

  module.exports = typeDefs;