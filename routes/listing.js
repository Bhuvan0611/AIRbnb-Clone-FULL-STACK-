const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middlewear.js");
const User = require("../models/user");
const listingController = require("../controllers/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ALL LISTINGS

// "/" Routes 

router
    .route("/")
    .get(validateListing, listingController.index)
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        listingController.createListing);



// NEW LISTING FORM

router.get("/new", isLoggedIn, listingController.renderNewForm);


// "/:id" Routes 

router
    .route("/:id")
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, listingController.updateListing)
    .delete(isLoggedIn, isOwner, listingController.destroyListing);


// EDIT FORM

router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);


module.exports = router;