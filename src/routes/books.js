const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');

router.get('/', bookController.getAll);
router.post('/', bookController.addBook);

module.exports = router;