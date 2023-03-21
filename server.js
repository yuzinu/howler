'use strict';

const express = require('express');
const mainRoutes = require("./routes/main")

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use("/", mainRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Howler is running on http://${HOST}:${PORT}`);
});