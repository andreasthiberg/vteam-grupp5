const express = require('express');
const path = require('path');

const router = express.Router();

/* Index route */
router.get('/', (req, res,) => {
    res.send("Välkommen till High5 API.");
});

/* Route to load API documentation html file */
router.get('/doc', (req, res,) => {
    res.sendFile(path.join(__dirname, '/api_doc.html'));
});

module.exports = router;