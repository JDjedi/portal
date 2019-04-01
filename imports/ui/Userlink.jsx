import React from 'react';
import { Accounts } from 'meteor/accounts-base'


export default class Userlink extends React.Component {
	onLogout(e) {
	    Accounts.logout(); 
	}

	render() {
		return(
			<div>
				<h1>Your Links</h1>
				<button onClick={this.onLogout.bind(this)}>Logout</button>
			</div>
		)
	}
}

