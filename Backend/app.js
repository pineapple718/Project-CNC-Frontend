const express = require('express')
const app = express()

require("dotenv").config();
require("./connection/conn");

const user = require("./routes/userRoutes");
const reservation = require("./routes/reservationRoutes");
const fishingReservation = require("./routes/fishingReservationroutes");

app.use(express.json());

const port = process.env.PORT || 8080 ;




app.use("/user" , user);
app.use("/tableReservation" , reservation);
app.use("/fishing" , fishingReservation);


app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})


