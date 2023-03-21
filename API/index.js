const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');


dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen( 5000, () => {
    console.log("Backend server is running!");
  });