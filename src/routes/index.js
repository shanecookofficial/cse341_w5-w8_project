const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/auth', require('./auth'));
router.use('/profile', require('./profile')); // This sets the prefix for the profile route.

module.exports = router;
