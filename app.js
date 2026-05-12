require("dotenv").config();
const bcrypt = require("bcrypt");
const session = require("express-session");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'keyboardcat';

const teamMembers = [
  { name: "Mickayla Combrink", role: "Team Lead", image: "mickayla.jpg" },
  { name: "Hendrik", role: "Frontend Developer", image: "hendrik.jpeg" },
  { name: "Hanre Koen", role: "Backend Developer", image: "Hanre.jpeg" },
  { name: "Emmanuel Teodor", role: "Database", image: "EmmanuelT.jpeg" },
  { name: "Emmanuel Chinomoso", role: "Security", image: "EmmanuelC.jpeg" }
];

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/community_portal";

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)
.then(async () => {
  console.log("[DB] Connected to MongoDB");
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        password: passwordHash,
        role: "admin"
      });
      console.log("[DB] Admin user created:", process.env.ADMIN_EMAIL);
    }
  }
})
.catch((err) => {
  console.warn("[DB] MongoDB connection failed - running in development mode without database");
  console.warn("[DB] Error:", err.message);
});

app.use(express.static(path.join(__dirname, "Public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.user = req.session && req.session.user ? req.session.user : null;
  next();
});

const authRoutes = require("./Routes/auth");
const pageRoutes = require("./Routes/PageRoutes");

app.use('/', authRoutes);
app.use('/', pageRoutes({ teamMembers }));

app.use((req, res, next) => {
  res.status(404).render('Errors/404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("Errors/error", {
    message: err.message || "Something went wrong.",
    status: err.status || 500
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
