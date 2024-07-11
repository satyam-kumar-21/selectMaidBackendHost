const MaidInNoida = require("../models/maidInNoida");
const cloudinary = require("cloudinary");

// Create a new MaidInNoida
const createNoidaMaid = async (req, res) => {
    try {
        // Upload file to Cloudinary if there's an image
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "services-images", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        const { name, details } = req.body;

        const newMaid = await MaidInNoida.create({ name, details, image });
        res.status(201).json(newMaid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a MaidInNoida
const updateNoidaMaid = async (req, res) => {
    try {
        // Check if there is a file to upload
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "services-images", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        // Extract updated fields from request body
        const { name, details } = req.body;

        // Prepare update object based on whether image was uploaded
        const updateFields = { name, details };
        if (image) {
            updateFields.image = image;
        }

        // Find and update the MaidInNoida
        const updatedMaid = await MaidInNoida.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedMaid) {
            return res.status(404).json({ message: "Maid not found" });
        }

        res.json(updatedMaid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a MaidInNoida
const deleteNoidaMaid = async (req, res) => {
    try {
        const deletedMaid = await MaidInNoida.findByIdAndDelete(req.params.id);
        if (!deletedMaid) {
            return res.status(404).json({ message: "Maid not found" });
        }
        res.json({ message: "Maid deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all MaidsInNoida
const getAllNoidaMaids = async (req, res) => {
    try {
        const maids = await MaidInNoida.find();
        res.status(200).json(maids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNoidaMaid,
    updateNoidaMaid,
    deleteNoidaMaid,
    getAllNoidaMaids,
};
