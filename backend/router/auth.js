const jwt = require('jsonwebtoken');//for token
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')//for hashing
const authenticate = require("../middleware/authenticate");
require('../db/conn');
const User = require("../model/userschema")
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get('/', async (req, res) => {
  res.send("App is working");
})
router.post('/adduser', async (req, res) => {
  const { fname, lname, phone, email, password } = req.body;
  if (!fname || !lname || !phone || !email || !password) {
    return res.status(401).json({ error: "Plz fill all the fields" });
  }
  // console.log(country.length);
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if ((emailRegex.test(email) === false)) {
    return res.status(406).json({ error: "Email is not valid" });
  }
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  if ((phoneRegex.test(phone) === false) || phone.length !== 10) {
    return res.status(405).json({ error: "Phone number is not valid" });
  }
  try {

    const userExist = await User.findOne({ phone: phone }); //database email=user email // edit ash
    if (userExist) {
      return res.status(402).json({ error: "phone no  already Exist" });
    } 
    const user = new User({ fname, lname, phone, email, password });

    const saveUser = await user.save();
    if (saveUser) {
      res.status(201).json({ message: "success" });
    }
    else {
      res.status(501).json({ error: "Failed to add users" });
    }

  } catch (err) {
    console.log(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(401).json({ error: "pls Fill all the fields" })
    }
    const userLogin = await User.findOne({ phone: phone });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Email or password is incorrect" });
      }
      else {
        const token = await userLogin.generateAuthToken();
        res.cookie("usertoken", token, {
          expires: new Date(Date.now() + 2589200000),
          httpOnly: true
        });
        res.status(202).json("success");
      }
    }
    else {
      res.status(400).json({ error: "Email or password is incorrect" });
    }

  } catch (err) {
    console.log((err));
  }
})
router.post('/getuserdetails', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ error: "pls enter the email" })
    }
    const userLogin = await User.find({ email: email });
    if (userLogin.length != 0) {
      res.status(202).json(userLogin);
    }
    else {
      res.status(400).json({ error: "Email or password is incorrect" });
    }

  } catch (err) {
    console.log((err));
  }
})
router.post('/updateuser', authenticate, async (req, res) => {
  const { fname, lname, phone } = req.body;
  if (!fname || !lname || !phone) {
    return res.status(401).json({ error: "Plz fill all the fields" });
  }
  const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
  if ((phoneRegex.test(phone) === false) || phone.length !== 10) {
    return res.status(405).json({ error: "Phone number is not valid" });
  }
  try {
    const user = await User.updateOne({ email: req.rootUser.email },
      {
        $set: {
          fname, lname, phone, course, country, date
        }
      });
    console.log(user)
    if (user) {
      res.status(201).json({ message: "success" });
    }
    else {
      res.status(501).json({ error: "Failed to update users" });
    }

  } catch (err) {
    console.log(err);
  }
});
router.get('/logout', async (req, res) => {
  try {
    const logout = res.clearCookie('usertoken', { path: "/" });
    if (logout) {
      res.status(200).json("successfully logout");
    }
    else {
      res.status(400).json({ error: "Not logout" });
    }
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;