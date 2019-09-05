const Wow = require('../controllers/wow');

module.exports = app => {
	app.route('/').get(Wow.list);
	app.route('/wows').post(Wow.post);
};