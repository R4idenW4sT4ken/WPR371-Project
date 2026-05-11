// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Show login page
exports.showLogin = (req, res) => {
  res.render('Auth/login');
};

// Show register page
exports.showRegister = (req, res) => {
  res.render('Auth/register');
};

// Handle registration
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.send("Passwords do not match.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("Email already registered.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();
    res.redirect('/login');

  } catch (err) {
    next(err);
  }
};

// Handle login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Invalid email or password.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send("Invalid email or password.");
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    if (user.role === 'admin') {
      res.redirect('/admin/events');
    } else {
      res.redirect('/');
    }

  } catch (err) {
    next(err);
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};