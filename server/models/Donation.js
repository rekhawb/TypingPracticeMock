const { Schema, model } = require('mongoose');

const donationSchema = new Schema({

    donationTitle: {
        type: String,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },

 donationDesc: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },

  donationPrice: {
    type: Number,
    min:1.00,
    default:1.00
  }
});

const Donation= model('Donation', donationSchema);

module.exports = Donation;