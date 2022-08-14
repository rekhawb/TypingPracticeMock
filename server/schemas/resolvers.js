const { User, Paragraph,Donation,Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth');

const stripe = require('stripe')('sk_test_51LUT8iF2iC57NwAvKj39nzrTl30HfI9sj7hubL9zrHJIHUgg6uS0LgysPxkE4F9HUaSkAT7bAZYXQYPD9A0tM7ze00uClaOei4');

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


    donation: async (parent, args, context) => {

        
      if (context.user) {
        const donationData = await Donation.find();
        //console.log(paragraphData);
        return donationData;
      }
      throw new AuthenticationError("You need to be logged in - Donation!");
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.donations'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    //checkout start

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ donations: args.donations });
      const line_items = [];

      const { donations } = await order.populate('donations');

      for (let i = 0; i < donations.length; i++) {
        const donation = await stripe.products.create({
          name: donations[i].donationTitle,
          description: donations[i].donationDesc
        });

        const price = await stripe.prices.create({
          product: donation.id,
          unit_amount: 1*100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }



    //checkout end

  },

    Mutation: {
        //mutation 1
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
        },


        addOrder: async (parent, { donations}, context) => {
          console.log(context);
          if (context.user) {
            const order = new Order({ donations});
    
            await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
    
            return order;
          }
    
          throw new AuthenticationError('Not logged in');
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
    
        removeProgress: async (parent, { _id }, context) => {
          if (context.user) {
            const userUpdated = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { previousWork: { _id: _id} } },
              { new: true }
            );
    
            return userUpdated;
          }
          throw new AuthenticationError("You need to be logged in!");
        },
      },



}

module.exports = resolvers;