const Hero = require("../models/heroModel");
const cloudinary = require("cloudinary");

const createHero = async (req, res) => {
 
  try {
    // Upload file to Cloudinary
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "course-images", // Folder in Cloudinary to store images
        width: 250, // Resize width to 250px
        height: 250, // Resize height to 250px
        crop: "fill", // Crop mode
      });
      image = result.secure_url; // Store the Cloudinary URL
      // console.log("Image",image);
    }

    const { heading, description } = req.body;

    const newHero = await Hero.create({ heading, description, image });
    res.status(201).json(newHero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHero = async (req, res) => {
    try {
      // Check if there is a file to upload
      let image;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "course-images", // Folder in Cloudinary to store images
          width: 250, // Resize width to 250px
          height: 250, // Resize height to 250px
          crop: "fill", // Crop mode
        });
        image = result.secure_url; // Store the Cloudinary URL
      }
  
      // Extract updated fields from request body
      const { heading, description } = req.body;
  
      // Prepare update object based on whether image was uploaded
      const updateFields = {
        heading,
        description,
      };
      if (image) {
        updateFields.image = image;
      }
  
      // Find and update the hero
      const updatedHero = await Hero.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );
  
      if (!updatedHero) {
        return res.status(404).json({ message: "Hero not found" });
      }
  
      res.json(updatedHero);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

const deleteHero = async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    if (!deletedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHero,
  updateHero,
  deleteHero,
};
