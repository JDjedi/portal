import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import PropTypes from 'prop-types'; 

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
				<p key={this.props._id}>{this.props.url}</p>
				{/*<p>{this.props.visible.toString()}</p>*/}
				{/*<p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p>*/}
				<button>
					<a href={this.props.url} target="_blank"> {/*Creates new tab when visit button clicked, sending user to link site*/}
						Visit
					</a>
				</button>


				<button name="copy-button" ref="copy" data-clipboard-text={this.props.url}>
					{this.state.justCopied ? "Copied" : "Copy"}
				</button>
				<button onClick={() => {
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
				}}>
					{this.props.visible ? 'Hide' : 'Unhide'}
				</button>
			</div>
		)
	}
}

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
};



