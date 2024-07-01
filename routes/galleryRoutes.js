const express = require("express");
const galleryRouter = express.Router();
const upload = require("../middleware/fileUploadMulter");
const { createGallery, updateGallery, deleteGallery, getAllGalleries } = require("../controllers/galleryController");

// Create a new gallery item
galleryRouter.post("/upload-gallery", upload.single("image"), createGallery);

// Update an existing gallery item
galleryRouter.put("/update-gallery/:id", upload.single("image"), updateGallery);

// Delete a gallery item
galleryRouter.delete("/delete-gallery/:id", deleteGallery);

//get all
galleryRouter.get("/all-galleries", getAllGalleries);

module.exports = galleryRouter;
