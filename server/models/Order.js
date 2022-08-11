const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({

    userId:{
   type:String,
   required: true
    },


  purchaseDate: {
    type: Date,
    default: Date.now
  },
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donation'
    }
]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
