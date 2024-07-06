// controllers/blogController.js
const Blog = require('../models/blog');
const cloudinary = require('cloudinary');

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs-images', // Folder in Cloudinary to store blog images
        width: 800, // Resize width to 800px
        height: 600, // Resize height to 600px
        crop: 'fill', // Crop mode
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    const { title, description } = req.body;

    const newBlog = await Blog.create({ title, description, imageUrl: image });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing blog post
const updateBlog = async (req, res) => {
  try {
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs-images', // Folder in Cloudinary to store blog images
        width: 800, // Resize width to 800px
        height: 600, // Resize height to 600px
        crop: 'fill', // Crop mode
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    const { title, description } = req.body;

    const updateFields = { title, description };
    if (image) {
      updateFields.imageUrl = image;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
