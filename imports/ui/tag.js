import { Template } from 'meteor/templating';
import './tag.html';
import { Tags } from '../../collections/Tags.js'; 
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'


   Template.tag.helpers({
		tags(){
			console.log(Tags.find({},  {sort: { createdAt: -1 }} ).fetch())
			return Tags.find({},  {sort: { createdAt: -1 }} ).fetch();
		},
    });
	