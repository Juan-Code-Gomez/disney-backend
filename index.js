const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");

const genderRoute = require("./routes/gender");
const movieRoute = require("./routes/movie");


const app = express();
app.use(bodyParser.json());

app.use("/", genderRoute)
app.use("/", movieRoute)

app.listen(
    process.env.PORT || 3000, () =>
    console.log(`Backend server runing on port: ${process.env.PORT}`)
);