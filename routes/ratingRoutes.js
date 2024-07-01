const express = require("express");
const ratingRouter = express.Router();
const upload = require("../middleware/fileUploadMulter");
const {
  createRating,
  updateRating,
  deleteRating,
  getAllRatings
} = require("../controllers/ratingController");

ratingRouter.post("/create-rating", upload.single("image"), createRating);
ratingRouter.put("/update-rating/:id", upload.single("image"), updateRating);
ratingRouter.delete("/delete-rating/:id", deleteRating);
ratingRouter.get("/get-all-ratings", getAllRatings);

module.exports = ratingRouter;
