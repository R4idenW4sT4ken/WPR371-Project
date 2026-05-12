// app.js
require("dotenv").config();
const session = require("express-session");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/community_portal";

mongoose.connect(MONGO_URI, {})
  .then(() => {
    console.log("[DB] Connected to MongoDB");
  })
  .catch((err) => {
    console.error("[DB] MongoDB connection error:", err);
  });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Routes
const authRoutes = require("./Routes/auth");
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send(`Welcome ${req.session.user ? req.session.user.name : 'Guest'}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("Errors/error", {
    message: err.message || "Something went wrong.",
    status: err.status || 500
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});