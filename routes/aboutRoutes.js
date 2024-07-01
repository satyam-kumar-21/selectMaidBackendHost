const express = require("express");
const aboutRouter = express.Router();
const upload = require("../middleware/fileUploadMulter");
const { createAbout, updateAbout, deleteAbout, getAbout } = require("../controllers/aboutController");

// Create a new about section
aboutRouter.post("/create-about", upload.single("image"), createAbout);

// Update an existing about section
aboutRouter.put("/update-about/:id", upload.single("image"), updateAbout);

// Delete an about section
aboutRouter.delete("/delete-about/:id", deleteAbout);
aboutRouter.get("/get-about", getAbout);

module.exports = aboutRouter;
