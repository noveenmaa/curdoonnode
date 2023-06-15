const mongoose = require("mongoose");

const userData = new mongoose.Schema({

 
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const fullData = new mongoose.model("tableEntry", userData);

module.exports = fullData;
