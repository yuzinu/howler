const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

router.get("/api/feed", mainController.getHowls);

router.get("/api/howl/:id", mainController.getHowl);

router.post("/api/howl/createHowl", mainController.createHowl);

router.patch("/api/howl/changeHowl/:id", mainController.changeHowl);

router.delete("/api/howl/silenceHowl/:id", mainController.silenceHowl);

module.exports = router;