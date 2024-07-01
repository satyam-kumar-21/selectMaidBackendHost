const Gallery = require("../models/galleryModel");
const cloudinary = require("cloudinary");

const createGallery = async (req, res) => {
    try {
        // Upload file to Cloudinary if there's an image
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "gallery-images", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        const { description } = req.body;

        const newGallery = await Gallery.create({ description, image });
        res.status(201).json(newGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateGallery = async (req, res) => {
    try {
        // Check if there is a file to upload
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "gallery-images", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        // Extract updated fields from request body
        const { description } = req.body;

        // Prepare update object based on whether image was uploaded
        const updateFields = { description };
        if (image) {
            updateFields.image = image;
        }

        // Find and update the gallery item
        const updatedGallery = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedGallery) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        res.json(updatedGallery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
        if (!deletedGallery) {
            return res.status(404).json({ message: "Gallery item not found" });
        }
        res.json({ message: "Gallery item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createGallery,
    updateGallery,
    deleteGallery,
    getAllGalleries
};
