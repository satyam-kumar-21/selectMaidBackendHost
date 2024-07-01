const express = require("express");

const {createHero,updateHero,deleteHero} = require("../controllers/heroControllers");
const upload = require("../middleware/fileUploadMulter.js");

const heroRouter = express.Router();

heroRouter.post("/create-hero", upload.single("image"),createHero);
heroRouter.put("/update-hero/:id", upload.single("image"), updateHero);
heroRouter.delete("/delete-hero/:id",deleteHero);

module.exports = heroRouter;