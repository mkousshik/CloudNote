const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 8 characters").isLength({min: 8}),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({
          error: "Please enter a unique email.",
          message: err.message,
        });
      });
  }
);

module.exports = router;
