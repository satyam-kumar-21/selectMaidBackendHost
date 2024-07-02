const express = require('express');
const cors = require('cors'); // Import cors middleware
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary").v2;
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
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow requests from specified origins
// const allowedOrigins = [
//   'http://127.0.0.1:3000', // Add other origins as needed for different environments
//   'https://selectmaid.netlify.app/*' // Add your production domain
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

//app.use(cors(corsOptions)); // Use cors middleware with options

app.use(cors({
  origin: 'https://selectmaid.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // enable passing of cookies from client to server
}));

// Cloudinary setup
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
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

// Predefined admin credentials
const admin = {
  username: 'selectmaid@admin',
  password: 'selectmaid@123'
};

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
