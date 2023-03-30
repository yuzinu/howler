'use strict';

const express = require("express");
// App
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { auth } = require("express-openid-connect");
const mainRoutes = require("./routes/main");

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

//Use .env file
dotenv.config({ path: "../.env" });

app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  secret: process.env.AUTH_SECRET,
  idpLogout: true,
};

app.use(auth(authConfig));

app.use("/", mainRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Howler is running on http://${HOST}:${PORT}`);
});