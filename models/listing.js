const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const Default_link =
    "https://images.unsplash.com/photo-1764957079571-5954304f35e7?q=80&w=687&auto=format&fit=crop";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1764957079571-5954304f35e7?q=80&w=687&auto=format&fit=crop"
        }
    },

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],  // [lng, lat]
            required: true,
        }
    },
    category: {
        type: String,
        enum: [
            "Apartments",
            "Rooms",
            "Beach",
            "Mountains",
            "Iconic Cities",
            "Pools",
            "Camping",
            "Farms",
            "Luxury"
        ],
        required: true
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
