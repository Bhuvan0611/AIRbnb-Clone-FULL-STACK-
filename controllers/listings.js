const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user");
const axios = require("axios");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = wrapAsync(async (req, res) => {
    let { category, search } = req.query;

    let query = {};

    // category filter
    if (category) {
        query.category = category;
    }

    // 🔥 SEARCH (PRO VERSION)
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }

    const allListings = await Listing.find(query);

    res.render("listings/index.ejs", { allListings, category, search });
});

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.createListing = wrapAsync(async (req, res) => {

    if (!req.file) {
        return res.send("File missing");
    }

    let url = req.file.path || req.file.secure_url;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // 🔥 MAPBOX GEOCODING (replaces axios)
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    //  SAFETY CHECK (VERY IMPORTANT)
    if (response.body.features.length > 0) {
        newListing.geometry = response.body.features[0].geometry;
    }

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
});


module.exports.showListing = wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    // 🔥 ADD THIS (for map)
    let coords = null;
    if (listing.geometry?.coordinates) {
        coords = listing.geometry.coordinates;
    }

    res.render("listings/show.ejs", { listing, coords });
});



module.exports.renderEditForm = wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", " Listing you requested for does not exist !");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });

});


module.exports.updateListing = wrapAsync(async (req, res) => {
    const { id } = req.params;

    // 1️ Update basic fields
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });

    // 2️ If new image uploaded
    if (req.file) {
        let url = req.file.path || req.file.secure_url;
        let filename = req.file.filename;

        listing.image = { url, filename };

        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyListing = wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
});
