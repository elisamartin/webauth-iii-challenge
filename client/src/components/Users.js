import React from 'react';
import axios from 'axios';

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/api/users', {
				headers: {
					Authorization: localStorage.getItem('token')
				}
			})
			.then((res) => {
				this.setState({ users: res.data });
			});
	}

	render() {
		return (
			<div>
				<h2>Users</h2>
				<ul>
					{this.state.users.map((user) => (
						<li key={user.id}>
							{user.username} {user.department}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Users;
