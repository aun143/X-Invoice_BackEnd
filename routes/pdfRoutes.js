const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

router.get('/generate', pdfController.generatePDF);

module.exports = router;
