const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors")

const genderRoute = require("./routes/gender");
const movieRoute = require("./routes/movie");
const characterRoute = require("./routes/character");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", genderRoute)
app.use("/", movieRoute)
app.use("/", characterRoute)

app.listen(
    process.env.PORT || 3000, () =>
    console.log(`Backend server runing on port: ${process.env.PORT}`)
);