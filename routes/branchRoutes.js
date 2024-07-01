const express = require('express');
const branchRouter = express.Router();
const {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
} = require('../controllers/branchController');
const upload = require('../middleware/fileUploadMulter'); // Assuming you have a multer setup for file uploads
upload.single('image')
// Routes
branchRouter.post('/create-branch', upload.single('image'),createBranch);
branchRouter.put('/update-branch/:id', upload.single('image'),updateBranch);
branchRouter.delete('/delete-branch/:id', deleteBranch);
branchRouter.get('/get-all-branches',getAllBranches);

module.exports = branchRouter;
