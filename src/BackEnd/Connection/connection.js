const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_CONNC_STRING;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Connection Success!");
    }else{
        console.log(err.message)
    }
  }
);