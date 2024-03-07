const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  const data = "Hello World";
  return res.send(data);
});

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email is already registered. Please use a different email.",
      });
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const u = await user.save();
    res.status(200).json({ email: u.email });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser.password == pass) {
      res.status(200).json({ message: "Login success", user: existingUser.email });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
