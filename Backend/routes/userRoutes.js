const router = require("express").Router();
require("dotenv").config();
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");


async function checkIfExists(username) {
    const existingUser = await User.findOne({ username: username });
    return existingUser;
  }

  router.post("/sign-up", async (req, res) => {
    try {
      const { username, password, confirmPassword } = req.body;
  
      if (username.trim().length < 4) {
        return res.status(400).json({ message: "Username must be at least 4 characters long" });
      }
  
    
      const existingUser = await checkIfExists(username.trim());
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
     
      if (password.length <= 5) {
        return res.status(400).json({ message: "Password must be longer than 5 characters" });
      }
  
    
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
     
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const newUser = new User({
        username: username.trim(),
        password: hashedPassword,
      });
  
      await newUser.save();
      return res.status(201).json({ message: "Signup successful" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/sign-in", async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        res.status(400).json({ message: "Invalid credentials." });
      }
      await bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {
          const authClaims = {
            name: existingUser.username,
          };
          
          const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
            expiresIn: "30d",
          });
  
          res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
          });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  module.exports = router;
  
