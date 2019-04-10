import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';

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
			Meteor.subscribe('linksPublication') // calls out to the publication in api/links.js
			const returnedLinks = Links.find({
				visible: Session.get('showVisible') // filter db query based on session set value
			}).fetch();
			this.setState({ links: returnedLinks })
		})
	}

	// below fires after component is removed from the screen
	componentWillUnmount() {
		this.linksTracker.stop(); // stops the auto tracker from running after the component is closed
	}

	renderLinksListItems() {
		return this.state.links.map((link) => {
			const shortUrl = Meteor.absoluteUrl(link._id)
			// this allows the link obj from the map() call to have its attributes...
			//...accessed incrementally and individually without referencing link.whatever
			return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/> 
		});
	}

	render() {
		return(
			<div>
				<h2>Links List</h2>
				<div>
					{this.renderLinksListItems()}
				</div>
			</div>
		)
	}
}

