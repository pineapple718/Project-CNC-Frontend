const mongoose = require("mongoose");

const fishingSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String, 
    required: true,
  },
  tourType: { 
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  restroType: { 
    type: String,
    required: true,
  },
  specialRequests: {
    type: String,
    required: false,
  },
});

const FishingReservation = mongoose.model('FishingReservation', fishingSchema);

module.exports = FishingReservation;
