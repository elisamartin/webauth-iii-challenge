import React from 'react';
import axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			department: ''
		};
	}

	handleSubmit = () => {
		axios
			.post('http://localhost:5000/api/login', {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				localStorage.setItem('token', res.data.token);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit}>
					<p>username</p> <input type="text" name="username" onChange={this.changeHandler} />
					<p>password</p> <input type="text" name="password" onChange={this.changeHandler} />
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;
