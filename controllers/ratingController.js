const Rating = require("../models/ratingModel");
const cloudinary = require("cloudinary").v2;

// Create a new rating
const createRating = async (req, res) => {
  try {
    // Upload file to Cloudinary
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rating-images", // Folder in Cloudinary to store images
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    const { name, description, rating } = req.body;

    const newRating = await Rating.create({ name, description, rating, image });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing rating
const updateRating = async (req, res) => {
  try {
    // Check if there is a file to upload
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rating-images", // Folder in Cloudinary to store images
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    // Extract updated fields from request body
    const { name, description, rating } = req.body;

    // Prepare update object based on whether image was uploaded
    const updateFields = {
      name,
      description,
      rating,
    };
    if (image) {
      updateFields.image = image;
    }

    // Find and update the rating
    const updatedRating = await Rating.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rating
const deleteRating = async (req, res) => {
  try {
    const deletedRating = await Rating.findByIdAndDelete(req.params.id);
    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings
const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  getAllRatings,
};
