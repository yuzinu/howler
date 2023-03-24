const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js");

router.get("/", mainController.getHowls);
router.post("/createHowl", mainController.createHowl);
router.put("/changeHowl/:id", mainController.changeHowl);
router.delete("/silenceHowl/:id", mainController.silenceHowl);

module.exports = router;