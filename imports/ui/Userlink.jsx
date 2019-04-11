import React from 'react';
import { Meteor } from 'meteor/meteor'


import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink'
import LinksListFilters from './LinksListFilters';

// below was old functionaility, was not a container component; a more complicated container
// it was best to convert it into a stateless functional component as seen below on ln 24
// export default class Userlink extends React.Component {
// 	render() {
// 		return(
// 			<div>
// 				<PrivateHeader title="Your Links"/>
// 				<LinksList />
// 				<AddLink />
// 			</div>
// 		)
// 	}
// }

export default () => {
	return(
		<div>
			<PrivateHeader title="Your Links"/>
			<LinksListFilters />
			<LinksList />
			<AddLink />
		</div>
	)
}