const express = require('express');
const { generatePDF } = require('../Controllers/pdfController');
const router = express.Router();

router.get('/X-Invoice', generatePDF);

module.exports = router;
