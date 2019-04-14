import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			isOpen: false, // by default the modal shall not be shown bc the value here is false
			error: '' // this is a falsy value, which comes in handy down on line 45
		}
	}

	onSubmit(e) {
		const { url } = this.state;
		e.preventDefault() // needed to prevent page reset on firing function

		
		Meteor.call('links.insert', url, (err, res) => {
			if (!err) { 
				this.setState({ url: '', isOpen: false});
			} else {
				this.setState({error: err.reason})
			}
		}); // meteor method call to links.js meteor method
		
	}

	onChange(e) {
		this.setState({
			url: e.target.value
		})
	}

	render() {
		return(
			<div>
				<button className="button" onClick={() => {this.setState({isOpen: true})}}>
					+ Add Link
				</button>
				{/*Two required props for the modal container, isOpen and contentLabel*/}
				<Modal 
					isOpen={this.state.isOpen} 
					contentLabel="Add link" 
					inAfterOpen={() => this.refs.url.focus()} // this fires itself after the modal is opened
				> 
						<h1>Add Link</h1>
						{ this.state.error ? <p>{this.state.error}</p> : undefined}
						<form onSubmit={this.onSubmit.bind(this)}>
							<input
								type="text" 
								placeholder="URL"
								ref="url"
								value={this.state.url}
								onChange={this.onChange.bind(this)}
							/>
							<button>Add Link</button>
						</form>
						<button onClick={() => {this.setState({url: '', isOpen: false, error: ''})}}>
							- Close/Cancel Link Add
						</button>
				</Modal>
			</div>
		)
	}
}
