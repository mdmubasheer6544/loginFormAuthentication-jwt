const express = require("express");
const userDetails = require("../models/signup");
const bcrypt = require("bcrypt");
var multer = require("multer");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const FileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: FileFilter,
});

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

router.post("/sign-up", upload.single("userProf"), (req, res) => {
  const userProf = req.file.path;
  const { firstName, lastName, email, phone, password, address } = req.body;

  bcrypt.hash(password, 10).then(function (hash) {
    const newUser = new userDetails({
      firstName,
      lastName,
      email,
      phone,
      password: hash,
      address,
      userProf,
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

router.patch("/editUser/:id", upload.single("userProf"), (req, res) => {
  const { id } = req.params;
  const userProf = req.file.path;
  const newUser =req.body;

  userDetails
    .updateOne({ _id: id }, {...newUser,userProf})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
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
