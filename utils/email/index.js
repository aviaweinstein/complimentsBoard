const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const pug = require('pug');
const User = require('../../models/user');

const email = data => {
	if (!data) {
		return new Promise(reject => {
			const err = 'Missing data!';
			console.log(err);
			reject(err);
		});
	}

	return new Promise(async (resolve, reject) => {
		// if (config.env === 'test' || config.env === 'local') {
		// 	return resolve();
		// }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        let user;
        await User.find({ email: data.giver }, function (err, users) {
            user = users[0];
        });
        const email = pug.render(
            fs.readFileSync(__dirname + '/templates/wow_received.pug', 'utf8'),
            { data, user },
        );
        const msg = {
            to: data.receiver,
            from: {
                name: 'Compliments Board',
                email: 'no-reply@ComplimentsBoard.com',
            },
            subject: 'You received a Wow',
            content: [
                {
                    type: 'text/html',
                    value: email,
                },
            ],
        };

        sgMail
            .send(msg)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
	});
};

module.exports = email;