// routes/blogRoutes.js
const express = require('express');
const blogRouter = express.Router();
const blogController = require('../controllers/blogController');

// Routes
blogRouter.get('/get-all-blogs', blogController.getAllBlogs);
blogRouter.post('/create-blog', blogController.createBlog);
blogRouter.put('/update-blog/:id', blogController.updateBlog);
blogRouter.delete('delete-blog/:id', blogController.deleteBlog);

module.exports = blogRouter;
