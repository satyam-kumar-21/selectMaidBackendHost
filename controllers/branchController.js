const Branch = require('../models/branchModel');
const cloudinary = require('cloudinary').v2;

// Create a new branch
const createBranch = async (req, res) => {
  try {
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'branches-images', // Folder in Cloudinary to store branch images
        width: 800, // Resize width to 800px
        height: 600, // Resize height to 600px
        crop: 'fill', // Crop mode
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    const { name, address, phone, email } = req.body;

    const newBranch = await Branch.create({ name, address, phone, email, image });
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing branch
const updateBranch = async (req, res) => {
  try {
    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'branches-images', // Folder in Cloudinary to store branch images
        width: 800, // Resize width to 800px
        height: 600, // Resize height to 600px
        crop: 'fill', // Crop mode
      });
      image = result.secure_url; // Store the Cloudinary URL
    }

    const { name, address, phone, email } = req.body;

    const updateFields = { name, address, phone, email };
    if (image) {
      updateFields.image = image;
    }

    const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.json(updatedBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a branch
const deleteBranch = async (req, res) => {
  try {
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
};
