const express = require('express');
const router = express.Router();

// This route handles '/profile' because of the prefix set in src/routes/index.js
router.get('/', (req, res) => { // Changed to '/' to handle the actual '/profile' path
    if (req.isAuthenticated()) {
        // Sends a personalized greeting using the user's name.
        res.send(`Hi ${req.user.name}!`);
    } else {
        // Redirects to the Google auth if the user is not authenticated.
        res.redirect('/auth/google');
    }
});

module.exports = router;
