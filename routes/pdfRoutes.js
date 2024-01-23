const express = require('express');
const { generatePDF } = require('../Controllers/pdfController');
const router = express.Router();

router.get('/generate', generatePDF);

module.exports = router;
