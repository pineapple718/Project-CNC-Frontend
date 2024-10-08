const router = require("express").Router();

const { authenticateToken } = require("./userAuth");
const Reservation = require('../models/reservation');  


router.post('/reserve', authenticateToken , async (req, res) => {
  try {
    const { name, email, dateTime, numberOfGuests, specialRequests } = req.body;

   
    if (!name || !email || !dateTime || !numberOfGuests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const existingReservations = await Reservation.find({
      reservationDateTime: dateTime,
    });

    const totalGuests = existingReservations.reduce((sum, reservation) => sum + reservation.numberOfGuests, 0);
    const maxCapacity = 50; 
    if (totalGuests + numberOfGuests > maxCapacity) {
      return res.status(400).json({ message: 'Slot is fully booked, please choose another time' });
    }

   
    const reservation = new Reservation({
      name: name,
      email: email,
      reservationDateTime: dateTime,
      numberOfGuests: numberOfGuests,
      specialRequests: specialRequests,
    });

    await reservation.save();
    res.status(201).json({ message: 'Reservation successful', reservation });

  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});
