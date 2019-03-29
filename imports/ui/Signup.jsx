import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
	render() {
		return (
			<div>
				<h1>Signup for short lnk</h1>
				<p>content for signup page</p>
				<Link to="/login">Have an account?</Link>
			</div>

		)
	}
}