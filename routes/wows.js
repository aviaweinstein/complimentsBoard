const express = require('express');
const router = express.Router();
const secured = require('../lib/middleware/secured');
const Wow = require('../controllers/wow');

router.get('/wows', secured(), Wow.give);
router.post('/wows', secured(), Wow.post);

module.exports = router;
