const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });