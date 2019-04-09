import React from 'react';
import { Meteor } from 'meteor/meteor'


export default class AddLink extends React.Component {


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
				<form onSubmit={this.onSubmit.bind(this)}>
					<input type="text" ref="url" placeholder="URL"></input>
					<button>Add Link</button>
				</form>
			</div>
		)
	}
}
