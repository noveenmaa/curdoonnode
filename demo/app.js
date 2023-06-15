const express = require("express");
const app = express();
const expresslayout = require("express-ejs-layouts");
require("./config/db");
var bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(expresslayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./routers/main"));

app.listen(port, () => {
  console.log(`the port is ${port}`);
});
