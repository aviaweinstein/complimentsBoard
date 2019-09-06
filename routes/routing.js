const Wow = require('../controllers/wow');
const User = require('../controllers/user');

module.exports = app => {
	app.route('/').get(Wow.list);
    app.route('/wows').post(Wow.post);

    app.route('/login').get(User.login);
    app.route('/register').get(User.register);
    app.route('/user/authenticate').post(User.authenticate);
    app.route('/user/register').post(User.registerUser);
    // app.route('/').get(User.getAll);
    app.route('/user/current').get(User.getCurrent);
    app.route('/user/:id').get(User.getById);
    app.route('/user/:id').put(User.update);
    app.route('/user/:id').delete(User._delete);
};
