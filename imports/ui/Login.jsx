import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom';


export default class Login extends React.Component {
	constructor(props) {
		super(props);				
		this.state = {
			error: ''
		};
	}

	handleSubmit(e) {
		e.preventDefault(); 

		let email = this.refs.email.value.trim(); 
		let password = this.refs.password.value.trim();

		Meteor.loginWithPassword({email}, password, (error) => {
			console.log('Login Callback', error);
		})
	}

	render() {
		return (
			<div>
				<h1>Short Lnk</h1>

				{this.state.error && <p>{this.state.error}</p>} 

				<form className="form" onSubmit={this.handleSubmit.bind(this)}>
					<input type="email" ref="email" name="email" placeholder="Email"/> 
					<input type="password" ref="password" name="password" placeholder="Password"/>
					<button>Login</button>
				</form>

				<Link to="/signup">Have an account?</Link>
			</div>

		)
	}
}

