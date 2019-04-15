import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

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
		if (this.state.links.length === 0) {
			return (<div className="item"><p className="item__status-message">No links found</p></div>)
		}

		return this.state.links.map((link) => {

			// this allows the link obj from the map() call to have its attributes...
			//...accessed incrementally and individually without referencing link.whatever
			return <LinksListItem key={link._id} {...link}/> 
		});
	}

	render() {
		return(
			<div>
				<h2>Links List</h2>
				 <FlipMove maintainContainerHeight={true}>{/*Third party library here*/}
					{this.renderLinksListItems()}
				</FlipMove>
			</div>
		)
	}
}

