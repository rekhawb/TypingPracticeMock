const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const paragraphSchema = new Schema({

    paragraphTitle: {
        type: String,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },

 paragraphDesc: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  }
});

const Paragraph = model('Paragraph', paragraphSchema);

module.exports = Paragraph;
