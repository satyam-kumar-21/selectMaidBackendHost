const express = require("express");
const upload = require("../middleware/fileUploadMulter.js");
const { createGurugramMaid, updateGurugramMaid, deleteGurugramMaid, getAllGurugramMaids } = require("../controllers/gurugramMaidController.js");

const gurugramMaidRouter = express.Router();

gurugramMaidRouter.post("/create-gurugram-maids", upload.single("image"), createGurugramMaid);
gurugramMaidRouter.put("/update-gurugram-maids/:id", upload.single("image"), updateGurugramMaid);
gurugramMaidRouter.delete("/delete-gurugram-maids/:id", deleteGurugramMaid);
gurugramMaidRouter.get("/get-gurugram-maids", getAllGurugramMaids);

module.exports = gurugramMaidRouter;
