const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const dbConnect = require("./database/dbConfig");
const heroRouter = require("./routes/heroRoutes");
const aboutRouter = require("./routes/aboutRoutes");
const galleryRouter = require("./routes/galleryRoutes");
const newUpdateRouter = require("./routes/newUpdateRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const ratingRouter = require("./routes/ratingRoutes");
const branchRouter = require("./routes/branchRoutes");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

dbConnect();

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/hero", heroRouter);
app.use("/about", aboutRouter);
app.use("/gallery", galleryRouter);
app.use("/new-update", newUpdateRouter);
app.use("/service", serviceRouter);
app.use("/rating", ratingRouter);
app.use("/branch", branchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
