import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showVisible: true
		};
	}

	componentDidMount() {
		this.showVisibleTracker = Tracker.autorun(() => {
			this.setState({showVisible: Session.get('showVisible')})
		})
	}

	componentWillUnmount() {
		this.showVisibleTracker.stop();
	}

	render() {
		return (
			<div>
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
						Session.set('showVisible', !e.target.checked); // session defined and altered here
					}}/>
					Show Hidden Links
				</label>
			</div>
		)
	}
}




// export default (props) => {
// 	return (
// 		<div>
// 			<label>
// 				<input type="checkbox" onChange={(e) => {
// 					Session.set('showVisible', !e.target.checked); // session defined and altered here
// 				}}/>
// 				Show Hidden Links
// 			</label>
// 		</div>
// 	)
// };





