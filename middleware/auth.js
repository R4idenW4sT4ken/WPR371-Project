// middleware/auth.js

// Checks if the user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
}

// Checks if the logged in user is an admin
function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.status(403).send("Access denied. Admins only.");
}

module.exports = { isAuthenticated, isAdmin };