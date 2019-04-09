import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class LinksListItem extends React.Component {
	render() {
		return (
			<div>
				<p key={this.props._id}>{this.props.url} - {this.props.shortUrl}</p>
			</div>
		)
	}
}

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired
};
