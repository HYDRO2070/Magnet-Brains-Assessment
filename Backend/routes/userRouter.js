const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
  userSignup,
  userSignin,
  userSignout,
  homepage,
  allUsers,
  getLoggedInUser,
} = require("../controllers/userController");

//Get /homepage
router.get("/", homepage);

//Post /employe/signup
router.post("/signup", userSignup);

//Post /employe/signin
router.post("/signin", userSignin);

//get all users
router.get("/all", isAuthenticated, allUsers);

//Post /employe/signout
router.post("/signout", isAuthenticated, userSignout);

// Route to get current logged-in user
router.get("/currentuser", isAuthenticated, getLoggedInUser);

module.exports = router;
