import mongoose from "mongoose";
import sampleListings from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
    .then(() => {
        console.log("Connected to Db");
    })
    .catch((err) => {
        console.log("MongoDb connection error", err);
    });

    async function main() {
        await mongoose.connect(MONGO_URL);
    }

    const initDB = async () => {
        Listing.deleteMany({});
        await Listing.insertMany(sampleListings);
        console.log("Data was initalized");
    };

    initDB();