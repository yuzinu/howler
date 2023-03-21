const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js")

router.get("/", mainController.getHello);

module.exports = router;