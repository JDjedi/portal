import React from 'react';

// import { createBrowserHistory } from 'history';		// this is passed from the main.js file
// const history = createBrowserHistory();				// use this.props.history.etc...


export default class Userlink extends React.Component {
	onLogout(e) {
	    this.props.history.push('/login')
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

