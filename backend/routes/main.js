const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const { ensureAuth } = require("../middleware/auth");

router.get("/", mainController.signedIn);

router.get("/api/feed", ensureAuth, mainController.getHowls);

router.get("/api/howl/:id", ensureAuth, mainController.getHowl);

router.post("/api/howl/createHowl/", ensureAuth, mainController.createHowl);

router.patch("/api/howl/changeHowl/:id", ensureAuth, mainController.changeHowl);

router.delete("/api/howl/silenceHowl/:id", ensureAuth, mainController.silenceHowl);

module.exports = router;