import express from "express";
import mongoose from "mongoose";
import Listing from "./models/listing.js";
import { fileURLToPath } from "url";
import path from 'path';
import methodoverride from "method-override";
import ejsMate from "ejs-mate";

const app = express();

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main()
.then(() => {
    console.log("CONNECTED TO DB");
})
.catch((err) => {
    console.log("DB ERROR: ",err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}
// app.set("view engine", "ejs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi, I'm root");
})

//INDEX ROUTE
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
    
})

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})

//Create Route
app.post("/listings", async (req, res) => {
    // let {title, description, image, price, country, location} = req.body;
    const newListing = new Listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

})

// app.get("/testListing", async (req, res) => {
//     let sampListing = new Listing({
//         title: "Apna Ghar",
//         description: "By the beach",
//         price: 18000,
//         location: "Howrah, West Bengal" ,
//         country: "India",
//     });
//     await sampListing.save();
//     console.log("Sample was saved");
//     res.send("successful testing");
    
// })

app.listen(8000, () => {
    console.log("Server is listening to port 8000");
})