import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		}
	}

	// below fires right after the component is rendered to the screen
	componentDidMount() {
		// use this.clipboard in order to allow clipboard to be a prop of the parent class, allowing it to be used in other methods like componentWillUnmount()
		this.clipboard = new Clipboard(this.refs.copy); // binds the library to ref in the button down below, util. doc.exec call from in broweser support

		this.clipboard.on('success', () => { // first arg. is success, meaning the successful firing of clipboard lib
			this.setState({justCopied: true})
			setTimeout(() => { this.setState({justCopied: false}) }, 1500);
		}).on('error', () => {			// chain! error functionality
			alert('Unable to copy')
		})
	}

	componentWillUnmount() {
		this.clipboard.destroy();
	}

	render() {
		return (
			<div>
				<p key={this.props._id}>{this.props.url} - {this.props.shortUrl}</p>
				<button name="copy-button"ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? "Copied" : "Copy"}</button>
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

