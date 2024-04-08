function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // If the user is not authenticated, redirect them to the login page
    res.redirect('/auth/google');
  }
  
  module.exports = ensureAuthenticated;