const express = require("express");
const serviceRouter = express.Router();
const upload = require("../middleware/fileUploadMulter");
const {
    createService,
    updateService,
    deleteService,
    getAllServices
} = require("../controllers/serviceController");

// Create a new service
serviceRouter.post("/create-service", upload.single("image"), createService);

// Update an existing service
serviceRouter.put("/update-service/:id", upload.single("image"), updateService);

// Delete a service
serviceRouter.delete("/delete-service/:id", deleteService);

// Get all services
serviceRouter.get("/get-all-services", getAllServices);

module.exports = serviceRouter;
