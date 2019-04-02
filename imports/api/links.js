import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links') // export to have other files use this, const so that you can use it as a function call



if (Meteor.isServer) {
	// only available on the server
	// used old fashioned function syntac to access 'this' binding
	// this is a complete publication that we may subscirbe to on the client, determines which data is available to the client
	Meteor.publish('linksPublication', function() { 
		// this.userId 								// to access the userId on the client side we need to do this, and change the function syntax to access 'this'
		return Links.find({userId: this.userId});	// this links refers to the collection 'Links' the link defined in the first argument param in the publish()... 
	});												// ...call is merely the name we will subscribe to on the client side in LinkList.js line 19

}



