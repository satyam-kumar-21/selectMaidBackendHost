const express = require("express");
const upload = require("../middleware/fileUploadMulter.js");
const { createNoidaMaid, updateNoidaMaid, deleteNoidaMaid, getAllNoidaMaids } = require("../controllers/noidaMaidController.js");

const noidaMaidRouter = express.Router();

noidaMaidRouter.post("/create-noida-maids", upload.single("image"), createNoidaMaid);
noidaMaidRouter.put("/update-noida-maids/:id", upload.single("image"), updateNoidaMaid);
noidaMaidRouter.delete("/delete-noida-maids/:id", deleteNoidaMaid);
noidaMaidRouter.get("/get-noida-maids", getAllNoidaMaids);

module.exports = noidaMaidRouter;
