const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewear.js");

const userController = require("../controllers/users.js");

// "/signup" Routes 

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signup);

// "/login" Routes

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );

// LogOut route

router.get("/logout", userController.logout);

module.exports = router;