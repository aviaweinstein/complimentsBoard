let express = require('express');
let router = express.Router();
let secured = require('../lib/middleware/secured');
const User = require('../controllers/user');

router.get('/user', secured(), User.get);

module.exports = router;
