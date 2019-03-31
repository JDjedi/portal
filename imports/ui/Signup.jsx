import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
	constructor(props) {			// props come from without, state is defined from within the component
		super(props);				// need this to overide the React.component constructor
		this.state = {
			// count: 0
			error: ''
		};
	}
	// comments below are for state and setState examples
	// increment() {
	// 	this.setState({				// need setState to adjust state
	// 		count: this.state.count + 1
	// 	})
	// }

	handleSubmit(e) {
		e.preventDefault(); // prevents full page browser refresh, we don't need it right here for now

		let email = this.refs.email.value.trim(); // ref is used and pulled from down below
		let password = this.refs.password.value.trim();

		Accounts.createUser({email, password}, (error) => {
			console.log('Signup callback', error);
		});

		// this.setState({
		// 	error: 'Something went wrong.'
		// })
	}

	render() {
		return (
			<div>
				<h1>Signup for short lnk</h1>

				{this.state.error && <p>{this.state.error}</p>} 

				<form className="form" onSubmit={this.handleSubmit.bind(this)}>
					<input type="email" ref="email" name="email" placeholder="Email"/> {/* ref is an identifier react can use to target*/}
					<input type="password" ref="password" name="password" placeholder="Password"/>
					<button>Create Account</button>
				</form>


				{
					// <p>{this.state.count}</p>
					// <button onClick={this.increment.bind(this)}>+1</button>
					// <button onClick={() => {this.setState({count: this.state.count - 1})}}>-1</button>
					// <Link to="/login">Have an account?</Link>
				}
			</div>

		)
	}
}