const express = require('express');
const helmet = require('helmet');
const Users = require('./data/helpers/users-model');

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
	const hashPw = bcrypt.hashSync(user.password, 10);
	user.password = hashPw;

	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// [POST] /api/login
server.post('/api/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username }).first().then((user) => {
		if (users && bcrypt.compareSync(password, users.password)) {
			res.json({ info: 'Logged in' });
		} else {
			res.status(404).json({ message: 'You shall not pass!' });
		}
	});
});

// [GET] /api/users
server.get('/api/users', (req, res) => {
	Users.getUsers('users')
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
