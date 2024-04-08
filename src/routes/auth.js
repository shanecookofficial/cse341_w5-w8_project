const router = require('express').Router();
const passport = require('passport');

// Route to start the OAuth flow
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Callback route redirected to after the user agrees to the OAuth flow
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // User is authenticated, redirect or manage the session as needed
  res.redirect('/profile/');
});

module.exports = router;
