const express = require("express");
const app = express();
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
    res.send("Hi, I'm root");
})

app.listen(8000, () => {
    console.log("Server is listening to port 8000");
})