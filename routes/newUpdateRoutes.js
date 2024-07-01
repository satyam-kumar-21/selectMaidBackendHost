const express = require("express");
const newUpdateRouter = express.Router();
const upload = require("../middleware/fileUploadMulter");
const {
    createNewUpdate,
    updateNewUpdate,
    deleteNewUpdate,
    getAllNewUpdates
} = require("../controllers/newUpdateController");

// Create a new update item
newUpdateRouter.post("/create-new-update", upload.single("image"), createNewUpdate);

// Update an existing update item
newUpdateRouter.put("/update-new-update/:id", upload.single("image"), updateNewUpdate);

// Delete an update item
newUpdateRouter.delete("/delete-new-update/:id", deleteNewUpdate);

// Get all update items
newUpdateRouter.get("/get-all-new-updates", getAllNewUpdates);

module.exports = newUpdateRouter;
