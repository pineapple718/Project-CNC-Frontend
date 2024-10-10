const router = require("express").Router();

const { authenticateToken } = require("./userAuth");
const FishingReservation = require('../models/fishingReservation');
const User = require('../models/user'); 

router.post('/fishingReserve' , authenticateToken , async(req,res) => {
    try{

        const {name , email , phoneNumber, tourType , date , restroType , specialRequest} = req.body;
        const userId = req.user.id;
        
        if (!name || !email || !phoneNumber || !tourType || !date || !restroType ) {
            return res.status(400).json({ message: 'only specialRequest is optional.' });
          }

          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const existingReservations = await FishingReservation.find({
            reservationDate: date,
          });
      
          const totalGuests = existingReservations.reduce((sum, reservation) => sum + reservation.numberOfGuests, 0);
          const maxCapacity = 50; 
          if (totalGuests + 1 > maxCapacity) { 
            return res.status(400).json({ message: 'Slot is fully booked, please choose another time' });
          }
      
        
          const reservation = new FishingReservation({
            user : userId,
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            tourType : tourType,
            reservationDate : date ,
            restroType : restroType ,
            specialRequests : specialRequest,
          });
     
          await reservation.save();
          res.status(201).json({ message: 'Reservation successful', reservation });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again later' });
    }
})

    module.exports = router ;