const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength : 3
      },

      password: {
        type: String,
        required: true,
        minlength : 6
      }
});

const UserSchema = mongoose.model("User" , user);
module.exports = UserSchema;