const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const https = require('https');
const helmet = require("helmet");
const fs = require('fs');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const options = {
    key:  fs.readFileSync('../key.pem'),
    cert:  fs.readFileSync('../cer.pm')
};


  
// Create an HTTP server using the express app
const server = https.createServer(options, app);

const corsOptions = {
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  crossOriginResourcePolicy: { policy: "same-site" }
};
app.use(cors(corsOptions));
// Set up middleware to set HTTP headers for improved security
app.use(
helmet({
contentSecurityPolicy: {
directives: {
...helmet.contentSecurityPolicy.getDefaultDirectives(),
"img-src": ["'self'", "data:", "blob:"],
},
},
})
);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

server.listen( 5000, () => {
  console.log("Backend server is running!");
});