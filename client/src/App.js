import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';
import Register from './components/Register';

class App extends Component {
	logout = () => {
		localStorage.removeItem('token');
	};

	render() {
		return (
			<div className="App">
				<h1>React</h1>
				<nav>
					<NavLink to="/">Login</NavLink>
					<NavLink to="/users">Users</NavLink>
					<NavLink to="/register">Register</NavLink>
					<button onClick={this.logout}>Logout</button>
				</nav>
				<div>
					<Route exact path="/" component={Login} />
					<Route exact path="/users" component={Users} />
					<Route exact path="/register" component={Register} />
				</div>
			</div>
		);
	}
}

export default withRouter(App);
