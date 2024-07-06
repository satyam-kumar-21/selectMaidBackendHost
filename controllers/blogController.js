const Blog = require("../models/blog");
const cloudinary = require("cloudinary");

const createBlog = async (req, res) => {
    try {
        // Upload file to Cloudinary if there's an image
        let image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "blog", // Folder in Cloudinary to store images
                width: 800, // Resize width to 800px
                height: 600, // Resize height to 600px
                crop: "fill", // Crop mode
            });
            image = result.secure_url; // Store the Cloudinary URL
        }

        const { title, description } = req.body;

        const newBlog = await Blog.create({ title, description, image });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
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
        const { title, description } = req.body;

        // Prepare update object based on whether image was uploaded
        const updateFields = { title, description };
        if (image) {
            updateFields.image = image;
        }

        // Find and update the new update item
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "New update item not found" });
        }

        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "New blog item not found" });
        }
        res.json({ message: "New update item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBlog = async (req, res) => {
    try {
        const newBlog = await Blog.find();
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
};
