const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, 
      },
      name: {
        type: String,
        required: true, 
      },
      email: {
        type: String,
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      },
      reservationDateTime: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value > Date.now(); 
          },
          message: 'Reservation date must be in the future',
        },
      },
      numberOfGuests: {
        type: Number,
        required: true,
        min: 1,
      },
      specialRequests: {
        type: String,
        required: false,
      }
    });
    
    const Reservation = mongoose.model('Reservation', reservationSchema);
    
    module.exports = Reservation;

