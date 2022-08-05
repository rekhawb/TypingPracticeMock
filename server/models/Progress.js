const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const progressSchema = new Schema({
    passageTitle:{
        type: String,
        // required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
        trim: true,

    },
  passageDesc: {
    type: String,
    // required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  attemptedOn: {
    type: String,
    trim: true
  },
  charCorrect: {
    type: String,
    trim: true,
  },
  charIncorrect: {
    type: String,
    trim: true,
  },
  timeSpent: {
    type: String,
    trim: true,
  },
  wpm: {
    type: String,
    trim: true,
  },
});

//const Progress = model("Progress",progressSchema);

module.exports = progressSchema;
