const userService = require('../services/user');

exports.login = (req, res) => {
	res.render('login', { messages: req.flash('info') });
};

exports.register = (req, res) => {
	res.render('register', { messages: req.flash('info') });
};

exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                req.flash('info', 'Username or password is incorrect');
                res.redirect('/login')
            }
        })
        .catch(err => next(err));
}

exports.registerUser = (req, res, next) => {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports.getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

exports.getCurrent = (req, res, next) => {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.getById = (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.update = (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports._delete = (req, res, next) => {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
