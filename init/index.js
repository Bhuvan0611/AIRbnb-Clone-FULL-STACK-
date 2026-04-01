const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
require("dotenv").config({ path: "../.env" });

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl);
    console.log("connected to DB");

    await initDB();   // run AFTER connection
}

main().catch((err) => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});

    // FETCH USER (BEST WAY)
    const user = await User.findOne({ username: "Bhuvan" });

    const updatedData = initData.data.map((obj) => ({
        ...obj,
        owner: user._id,   // correct owner
    }));

    await Listing.insertMany(updatedData);

    console.log("data was initialized");
};