const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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
const contactRoute = require('./routes/contactRoute');
// const delhiMaidRouter = require('./routes/delhiMaidsRoutes');
// const noidaMaidRouter = require('./routes/noidaMaidRoutes');
// const gurugramMaidRouter = require('./routes/gurugramMaidRoutes');
// const blogRouter = require('./routes/blogRoutes');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

dbConnect();


// const corsOptions = {
//   origin: "*", // Ensure this matches your frontend's origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', '*'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));

app.use(cors());

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// CORS Configuration
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  // if (req.method === "OPTIONS") {
  //   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  //   return res.status(200).json({});
  // }
  // next();
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});


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
app.use("/hero", heroRouter);
app.use("/about", aboutRouter);
app.use("/gallery", galleryRouter);
app.use("/new-update", newUpdateRouter);
app.use("/service", serviceRouter);
app.use("/rating", ratingRouter);
app.use("/branch", branchRouter);
// app.use("/blog", blogRouter);
app.use('/contact', contactRoute);
// app.use("/delhi-maids", delhiMaidRouter);
// app.use("/noida-maids",noidaMaidRouter);
// app.use("/gurugram-maids",gurugramMaidRouter);

// Predefined admin credentials
const admin = {
  username: 'selectmaid@admin',
  password: 'selectmaid@123'
};

app.get("/",(req,res) =>{
  res.send("hello duniya")
})

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Handle OPTIONS requests (preflight requests)
// app.options('*', cors(corsOptions)); // Enable preflight across all routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
