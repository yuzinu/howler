const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

router.post("/", mainController.signedIn);

router.get("/api/feed", mainController.getHowls);

router.post("/api/user", mainController.getUser);

router.get("/api/:username", mainController.getUserHowls);

router.get("/api/howl/:id", mainController.getHowl);

router.post("/api/howl/createHowl/", mainController.createHowl);

router.patch("/api/howl/changeHowl/:id", mainController.changeHowl);

router.delete("/api/howl/silenceHowl/:id", mainController.silenceHowl);

module.exports = router;
