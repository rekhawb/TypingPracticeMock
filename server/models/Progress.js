const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const progressSchema = new Schema({

  textId:{
  type: String,
        // required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
        trim: true,

},

    passageTitle:{
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
  grossWPM: {
    type: String,
    trim: true,
  },
  netWPM: {
    type: String,
    trim: true,
  },
 accuracy: {
    type: String,
    trim: true,
  }
});

//const Progress = model("Progress",progressSchema);

module.exports = progressSchema;
