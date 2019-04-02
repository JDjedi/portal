import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';



export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: []
		}
	}

	// below fires right after the component is rendered to the screen
	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => { // used to track changes to what you define from within, and then returns the changes
			const links = Links.find().fetch();
			this.setState({ links })
		})
	}

	// below fires after component is removed from the screen
	componentWillUnmount() {
		this.linksTracker.stop(); // stops the auto tracker from running after the component is closed
	}

	renderLinksListItems() {
		return this.state.links.map((link) => {
			return <p key={link._id}>{link.url}</p>;
		});
	}



	render() {
		return(
			<div>
				<p>Links List</p>
				<div>
					{this.renderLinksListItems()}
				</div>
			</div>
		)
	}
}