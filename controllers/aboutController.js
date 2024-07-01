const About = require("../models/aboutModel");
const cloudinary = require("cloudinary");

const createAbout = async (req, res) => {
    try {
        // Upload file to Cloudinary if there's an image
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "about-images", // Folder in Cloudinary to store images
                width: 250, // Resize width to 250px
                height: 250, // Resize height to 250px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        const { description1, description2 } = req.body;

        const newAbout = await About.create({ description1, description2, image });
        res.status(201).json(newAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAbout = async (req, res) => {
    try {
        // Check if there is a file to upload
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "about-images", // Folder in Cloudinary to store images
                width: 250, // Resize width to 250px
                height: 250, // Resize height to 250px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        // Extract updated fields from request body
        const { description1, description2 } = req.body;

        // Prepare update object based on whether image was uploaded
        const updateFields = {
            description1,
            description2,
        };
        if (image) {
            updateFields.image = image;
        }

        // Find and update the about section
        const updatedAbout = await About.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedAbout) {
            return res.status(404).json({ message: "About not found" });
        }

        res.json(updatedAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAbout = async (req, res) => {
    try {
        const deletedAbout = await About.findByIdAndDelete(req.params.id);
        if (!deletedAbout) {
            return res.status(404).json({ message: "About not found" });
        }
        res.json({ message: "About deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAbout = async (req, res) => {
    try {
        // Fetch the latest About section entry
        const about = await About.findOne().sort({ createdAt: -1 }).exec();

        if (!about) {
            return res.status(404).json({ message: "About section not found" });
        }

        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createAbout,
    updateAbout,
    deleteAbout,
    getAbout,
};
