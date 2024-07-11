const express = require("express");


const upload = require("../middleware/fileUploadMulter.js");
const { createDelhiMaid, updateDelhiMaid, deleteDelhiMaid, getAllDelhiMaids } = require("../controllers/delhiMaidController.js");

const delhiMaidRouter = express.Router();

noidaMaidRouter.post("/create-noida-maids", upload.single("image"),createDelhiMaid);
noidaMaidRouter.put("/update-noida-maids/:id", upload.single("image"), updateDelhiMaid);
noidaMaidRouter.delete("/delete-noida-maids/:id",deleteDelhiMaid);
noidaMaidRouter.get("/get-noida-maids", getAllDelhiMaids)

module.exports = delhiMaidRouter;