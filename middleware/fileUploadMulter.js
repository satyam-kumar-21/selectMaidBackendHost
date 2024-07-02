const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Allowed file extensions
const allowedImageExtensions = [".jpg", ".jpeg", ".webp", ".png", ".jfif"];
const allowedVideoExtensions = [".mp4", ".webm", ".ogg"];
const allowedExtensions = allowedImageExtensions.concat(allowedVideoExtensions).map(ext => ext.slice(1)); // Remove the dot

// Multer configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(1); // Remove the dot
    let resourceType = "auto";
    
    if (allowedImageExtensions.includes(`.${ext}`)) {
      resourceType = "image";
    } else if (allowedVideoExtensions.includes(`.${ext}`)) {
      resourceType = "video";
    }

    return {
      folder: 'uploads', // Folder name on Cloudinary (optional)
      format: ext, // Use the extension as format
      resource_type: resourceType // Set the resource type (auto, image, video, raw)
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size (example value)
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedImageExtensions.includes(ext) || allowedVideoExtensions.includes(ext)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error(`Unsupported file type: ${ext}`)); // Reject the file
    }
  }
});

module.exports = upload;
