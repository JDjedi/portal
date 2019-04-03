import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';

import LinksList from './LinksList';
import { Links } from '../api/links';


export default class Userlink extends React.Component {
	onLogout(e) {
	    Accounts.logout(); 
	}

	onSubmit(e) {
		const url = this.refs.url.value.trim()
		e.preventDefault() // needed to prevent page reset on firing function
		if (url) { 
			Meteor.call('links.insert', url); // meteor method call to links.js meteor method
			this.refs.url.value = '';
		}
	}

	render() {
		return(
			<div>
				<h1>Your Links</h1>
				<button onClick={this.onLogout.bind(this)}>Logout</button>
				<LinksList />
				<form onSubmit={this.onSubmit.bind(this)}>
					<input type="text" ref="url" placeholder="URL"></input>
					<button>Add Link</button>
				</form>
			</div>
		)
	}
}

