const { User, Paragraph } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      user: async (parent, args, context) => {

        
        if (context.user) {
          //   const userData = await User.findOne({ _id: context.user._id }).select('-__v - password')
          const userData = await User.findOne({ _id: context.user._id });
          //.populate('savedBooks'); .select(          "-__v - password"
          return userData;
        }
        throw new AuthenticationError("You need to be logged in queryMe!");
      },
  
      selectParagraph: async (parent, {_id}, context) => {
        if (context.user) {
        //const params =args. _id ? { _id } : {};
        const selectText = await Paragraph.findOne({_id});
        return selectText;
        }
        throw new AuthenticationError("You need to be logged in paragraph!");
      },

    paragraph: async (parent, args, context) => {

        
      if (context.user) {
        const paragraphData = await Paragraph.find();
        //console.log(paragraphData);
        return paragraphData;
      }
      throw new AuthenticationError("You need to be logged in paragraph!");
    },

  },

    Mutation: {
        //mutation 1
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
        },
    
        //mutation 2
        login: async (parent, { email, password }) => {

            //console.log(email);
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError("No user found with this email address");
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
          }
         
    
         const token = signToken(user);
         
          return { token, user };
        },
    
        //mutation 3 --- question
    
        saveProgress: async (parent, { progressData }, context) => {
          if (context.user) {
            const userUpdated= await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { previousWork: progressData } },
              { new: true }
            );
    
            return userUpdated;
          }
          throw new AuthenticationError("You need to be logged in saveBook!");
        },
    
        removeProgress: async (parent, { textId }, context) => {
          if (context.user) {
            const userUpdated = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { previousWork: { textId: textId } } },
              { new: true }
            );
    
            return userUpdated;
          }
          throw new AuthenticationError("You need to be logged in!");
        },
      },



}

module.exports = resolvers;