require("dotenv").config()
const mongoose = require("mongoose")

const conn = async ()=> {
    try{

        await mongoose.connect(process.env.URI , {})
        console.log("📦 connected to mongoDB");

    }catch(error){
        console.log("❌ error connecting to mongoDB: ", error.message)
    }
}

conn();