const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello world with node')
})

app.listen(
    process.env.PORT || 3000, () =>
    console.log(`Backend server runing on port: ${process.env.PORT}`)
);