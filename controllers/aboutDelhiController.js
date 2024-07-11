const DelhiAbout = require("../models/delhiAboutModel");
// Get all descriptions
const getAllDescriptions = async (req, res) => {
    try {
        const descriptions = await DelhiAbout.find();
        res.status(200).json(descriptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch descriptions' });
    }
};

// Get a single description by ID
const getDescriptionById = async (req, res) => {
    try {
        const description = await DelhiAbout.findById(req.params.id);
        if (!description) {
            return res.status(404).json({ error: 'Description not found' });
        }
        res.status(200).json(description);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch description' });
    }
};

// Create a new description
const createDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const newDescription = new DelhiAbout({ description });
        const savedDescription = await newDescription.save();
        res.status(201).json(savedDescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create description' });
    }
};

// Update a description by ID
const updateDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const updatedDescription = await DelhiAbout.findByIdAndUpdate(req.params.id, { description }, { new: true });
        if (!updatedDescription) {
            return res.status(404).json({ error: 'Description not found' });
        }
        res.status(200).json(updatedDescription);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update description' });
    }
};

// Delete a description by ID
const deleteDescription = async (req, res) => {
    try {
        const deletedDescription = await DelhiAbout.findByIdAndDelete(req.params.id);
        if (!deletedDescription) {
            return res.status(404).json({ error: 'Description not found' });
        }
        res.status(200).json({ message: 'Description deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete description' });
    }
};

module.exports = {
    getAllDescriptions,
    getDescriptionById,
    createDescription,
    updateDescription,
    deleteDescription
};
