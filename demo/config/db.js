const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const database = mongoose
  .connect("mongodb://127.0.0.1:27017/metadata", {
    useUnifiedTopology: true,
    useNewUrlParser: true,

    autoIndex: true,
  })
  .then(() => {
    console.log("the data base is connected ");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = database;
