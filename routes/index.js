const express = require('express');
const router = express.Router();
const secured = require('../lib/middleware/secured');
const Wow = require('../controllers/wow');

router.get('/', secured(), Wow.list);

module.exports = router;
