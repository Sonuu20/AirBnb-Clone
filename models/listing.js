import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg",
        set: (v) => v === "" ? "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg" 
        : v, //set is used to set the default value for any field
    },
    price: Number,
    location: String,
    Country: String,

});

 const Listing = mongoose.model("Listing", listingSchema);
export default Listing;