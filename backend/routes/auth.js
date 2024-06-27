const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const JWT_Secret = "koushik, focus!!!!";
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

//Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 8 characters").isLength({min: 8}),
  ], async (req, res) => {
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    // check whether user with this email exists already.
    try {
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error : "Sorry a user with this email already exists."})
      }
      const salt = bcrypt.genSaltSync(10);
      const secPass = bcrypt.hashSync(req.body.password, salt);
      
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data  = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_Secret);
      // console.log(authtoken);
      // res.json(user);
      res.json({authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error")
    }
  }
);

//Route 2: authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cann't be black").exists(),
  ], async (req, res) => {
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: 'Please try to login with correct credentials'});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: 'Please try to login with correct credentials'});
      }
      
      const payload = {
        user: {
          id: user.id,
        }
      }

      const authtoken = jwt.sign(payload, JWT_Secret);
      res.json({authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error")
    }

  }
);

//Route 3: get loggedin User Details using: POST "/api/auth/getuser".  Login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
} )

module.exports = router;
