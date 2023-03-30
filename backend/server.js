'use strict';

const express = require("express");
// App
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
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

app.use("/", mainRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Howler is running on http://${HOST}:${PORT}`);
});