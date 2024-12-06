const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);

module.exports = router;
