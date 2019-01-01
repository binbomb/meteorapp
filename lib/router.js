import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { Users } from '../collections/Users.js';
import {Meteor} from "meteor/meteor";

import '../imports/ui/app.js';
import '../imports/ui/body.js';
import '../imports/ui/loading.js';
import '../imports/ui/tag.js';
import '../imports/ui/content.js';
import '../imports/ui/calendar-page.js';
import '../imports/ui/View.js';
if(Meteor.isClient) {
		FlowRouter.route('/tags/:tagname/:title', {
		name:'tags',
		//subscriptions: function(params, queryParams) {
		//	console.log(Users.find({},  {sort: { createdAt: -1 },limit : 10} ).fetch())
		//	this.register('getUser', Meteor.subscribe('user1',params.tagname));
		//	console.log(Users.find({},  {sort: { createdAt: -1 },limit : 10} ).fetch())
	//	},
		action: function(params, queryParams) {
			

			console.log("chua sub")
			console.log("tags "+params.tagname);
			console.log(":title "+params.title);
			BlazeLayout.render('App',{ main: 'content',data:params.tagname});
		}
	});
	FlowRouter.route('/search', {
		name:'search',
		action: function(params, queryParams) {
			console.log("Yeah! We are on the post:", params.tagname);
			console.log("Yeah! We are on the post: queryParams ", queryParams);
			BlazeLayout.render('App', { main: 'content',data:queryParams });
		}
	});
	FlowRouter.route('/one', {
		name:'one',
		action: function(params, queryParams) {
			console.log("Yeah! We are on the post:", params.tagname);
			BlazeLayout.render('App', { main: 'tag' });
		}
	});
	FlowRouter.route('/two', {
		name:'two',
		action: function(params, queryParams) {
			console.log("Yeah! We are on the post:", params.tagname);
			BlazeLayout.render('App', { main: 'Calendar_Page' });
		}
	});
	FlowRouter.route('/', {
		name:'home',
		action: function(params, queryParams) {
				 console.log("Yeah! We are on Home");
			BlazeLayout.render('App',{ main: 'content'});
			
		}
	});
	FlowRouter.route('/:id/:title', {
		name:'Viewpost',
		action: function(params, queryParams) {
				 console.log("view "+params.id);
			BlazeLayout.render('App',{ main: 'View',data:{id:params.id}});
			
		}
	});

	FlowRouter.notFound = {
	  action() {
		  console.log("Yeah! not found");
		//BlazeLayout.render('App', { main: 'Calendar_Page' });
	  },
	};
}