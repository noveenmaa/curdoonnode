const express = require("express");
const router = express.Router();
const tableData = require("../models/table");
const mongoose = require("mongoose");
const useres = require("../models/admin");
//rendering login page-------------------------------------------------------------------------------
router.get("/", (req, res) => {
  res.render("index");
});

//verifing login data ---------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const data = await useres.findOne({ username });
    console.log(data);
    if (!data) {
      res.send("the data is invalid");
    }
    if (password === data.password) {
      res.redirect("table");
    }
    res.send("the data is invalid");
  } catch (error) {
    console.log(error);
  }
});
//registeration -----------------------------------------------------------------------------------
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", async (req, res) => {
  try {
    const data = new useres({
      username: req.body.username,
      password: req.body.password,
    });
    const datum = await useres.create(data);
    //console.log(datum)
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

// for adding new user data in table---------------------------------------

router.get("/adduser", (req, res) => {
  res.render("adduser");
});

router.post("/adduserdata", async (req, res) => {
  try {
    const dataInfo = new tableData({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    });
    const result = await dataInfo.save();
    // console.log(result)
    res.redirect("table");
  } catch (error) {
    console.log(error);
  }
});

router.get("/table", async (req, res) => {
  try {
    const data = await tableData.find();
    //console.log(data)
    res.render("table", { data });
  } catch (error) {
    console.log(error);
  }
});

// for editing user enter data

//--Edit----------------------------------------

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  //console.log(id);

  tableData
    .findById(id)
    .then((data) => {
      res.render("edituser", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/edit/:id", async (req, res) => {
  const query = {
    _id: req.params.id,
  };

  const data = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };

  try {
    const result = await tableData.updateOne(query, data);
    res.redirect("/table");
  } catch (error) {
    console.log(error);
  }
});

// for delete user enter data----------------------------------

router.delete("/delete/:id", async (req, res) => {
  let query = {
    _id: req.params.id,
  };
  try {
    const data = await tableData.deleteOne(query);
    res.redirect("/table");
   // console.log(data);
  } catch (error) {
    console.log(error);
  }
});



//searching data in data base-----------------------------------------------------------------------------


router.post('/searchpost',async(req,res)=>{
  try {
    const searchTerm  = req.body.valu
    console.log(searchTerm)
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    console.log(searchNoSpecialChar);
    const data = await tableData.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { email: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { address: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { phone: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
    });
    //console.log(data)
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;
