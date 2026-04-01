const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewear.js");

const reviewController = require("../controllers/reviews.js");

// POST reviews

router.post("/", isLoggedIn, validateReview, reviewController.createReview);

// DELETE reviews 

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview);

module.exports = router;

