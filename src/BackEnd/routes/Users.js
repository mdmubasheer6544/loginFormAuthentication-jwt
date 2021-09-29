const express = require("express");
const userDetails = require("../models/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");
const router = express.Router();

router.get("/show-user/:id", auth, (req, res) => {
  const id = req.params.id;
  userDetails
    .findOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/sign-up", (req, res) => {
  const { firstName, lastName, email, phone, password, address } = req.body;
  bcrypt.hash(password, 10).then(function (hash) {
    const newUser = new userDetails({
      firstName,
      lastName,
      email,
      phone,
      address,
      password: hash,
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  userDetails
    .find({ email: email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: users[0].email,
              password: users[0].password,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "5 minutes",
            }
          );

          return res.status(200).json({
            isLogin: true,
            message: "Authentication Sucess",
            token: token,
            data: users,
          });
        }
        res.status(401).json({
          isLogin: false,
          message: "Authentication Failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
