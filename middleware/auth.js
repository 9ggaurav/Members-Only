
const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/login");
};

const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = { ensureLoggedIn, ensureGuest };
