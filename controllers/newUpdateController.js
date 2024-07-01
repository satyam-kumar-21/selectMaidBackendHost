const NewUpdate = require("../models/newUpdateModel");
const cloudinary = require("cloudinary");

const createNewUpdate = async (req, res) => {
    try {
        // Upload file to Cloudinary if there's an image
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "new-updates", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        const { heading, description } = req.body;

        const newUpdate = await NewUpdate.create({ heading, description, image });
        res.status(201).json(newUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateNewUpdate = async (req, res) => {
    try {
        // Check if there is a file to upload
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "new-updates", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url;
        }

        // Extract updated fields from request body
        const { heading, description } = req.body;

        // Prepare update object based on whether image was uploaded
        const updateFields = { heading, description };
        if (image) {
            updateFields.image = image;
        }

        // Find and update the new update item
        const updatedNewUpdate = await NewUpdate.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedNewUpdate) {
            return res.status(404).json({ message: "New update item not found" });
        }

        res.json(updatedNewUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteNewUpdate = async (req, res) => {
    try {
        const deletedNewUpdate = await NewUpdate.findByIdAndDelete(req.params.id);
        if (!deletedNewUpdate) {
            return res.status(404).json({ message: "New update item not found" });
        }
        res.json({ message: "New update item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllNewUpdates = async (req, res) => {
    try {
        const newUpdates = await NewUpdate.find();
        res.status(200).json(newUpdates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNewUpdate,
    updateNewUpdate,
    deleteNewUpdate,
    getAllNewUpdates,
};
