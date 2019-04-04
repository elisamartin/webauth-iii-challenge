const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./data/helpers/users-model');
const protected = require('./middleware');

const server = express();

server.use(helmet());
server.use(express.json());

// Check server is working
server.get('/', (req, res) => {
	res.send("It's alive!");
});

// [POST] /api/register
server.post('/api/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Something went wrong' });
		});
});

function makeToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: '1h'
	};
	const token = jwt.sign(payload, 'secret', options);
	return token;
}

// [POST] /api/login
server.post('/api/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = makeToken(user);
				res.status(200).json({
					message: `Hi ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// [GET] /api/users
server.get('/api/users', protected, (req, res) => {
	Users.find('users')
		.select('id', 'username')
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.send(err);
		});
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
