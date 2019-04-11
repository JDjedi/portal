import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'; 

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

Meteor.methods({
	// addNumbers(a, b) { // meteor method test example
	// 	if ((typeof a === 'number') && (typeof b === 'number')) {
	// 		return a + b
	// 	} else {
	// 		throw new Error('typeof number violation, enter valid number data.')
	// 	}
	// }


	'links.insert'(url) { // naming convention right here
		if (!this.userId) {
			throw new Meteor.Error('not-authorized') // if this condition is not met, the program throws error and ends, otherwise it continues
		}

		new SimpleSchema({
			url: {type: String, label: 'Your link', regEx: SimpleSchema.RegEx.Url}
		}).validate({url: url})

		Links.insert({
			url,
			userId: this.userId,
			visible: true,	// to update records already made go to meteor mongo
							// do: db.links.updateMany({}, { $set: {visible: true}} // this adds visible prop to obj already in db
			visitedCount: 0,
			lastVisitedAt: null
		});
	},



	'links.setVisibility'(_id, visible) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized') // if this condition is not met, the program throws error and ends, otherwise it continues
		}

		new SimpleSchema({
			_id: {
				type: String,
				min: 1
			},
			visible: {
				type: Boolean
			}
		}).validate({_id, visible})

		Links.update({_id: _id, userId: this.userId}, { $set: {visible: visible}})
	},



	'links.trackVisit'(_id) {
		new SimpleSchema({
			_id: {
				type: String,
				min: 1
			}
		}).validate({_id})	

		Links.update({_id: _id}, {
			$set: {
				lastVisitedAt: new Date().getTime()
			},
			$inc: {
				visitedCount: 1
			}
		})
	}
})













