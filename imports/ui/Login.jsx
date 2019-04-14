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
			if (error) {
				this.setState({error: "Unable to login, check email and or password."})
			} else {
				this.setState({error: ''})
			}
		})
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Log into Short Lnk</h1>

					{this.state.error && <p>{this.state.error}</p>} 

					<form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate>
						<input type="email" ref="email" name="email" placeholder="Email"/> 
						<input type="password" ref="password" name="password" placeholder="Password"/>
						<button>Login</button>
					</form>

					<Link to="/signup">Need to create an account?</Link>
				</div>
			</div>

		)
	}
}

