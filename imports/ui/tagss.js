import { Template } from 'meteor/templating';
import './tagss.html';
import { Tags } from '../../collections/Tags.js'; 
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'


   Template.tagss.helpers({


    });
	 Template.tagss.events({
		'click .delete'() {
			console.log("chao")
			if (confirm('Are you sure you want to delete this thing into the database?')) {
			// Save it!
			if(Meteor.userId()==this.owner)	
				Tags.remove(this._id);
			} else {
				// Do nothing!
			}
			//Users.remove(this._id);
		 },
	 })
	