import { Template } from 'meteor/templating';
import './user.html';
import './taguser.html';
import './loading.html';
import { Users } from '../../collections/Users.js';
import { Meteor } from 'meteor/meteor';

import  hljs  from 'highlight.js';
import moment from 'moment'
Meteor.subscribe('users1');

UI.registerHelper('formatTime', function(context, options) {
//	// console.log(context)

  if(context)
    //return moment(context).format('MM/DD/YYYY, hh:mm');
	//return moment(context).fromNow()
	return  moment(context).from(new Date())
});
UI.registerHelper('trim_str', function(context, options) {
//	// console.log(context)
  if(context)
    //return moment(context).format('MM/DD/YYYY, hh:mm');

	return context.replace(/ /g, "-")
});
	Template.user.onRendered(function(){
	/*
		   Higligth Configuration using 
		   https://highlightjs.org
		  */
		 //// // console.log(hljs)
			hljs.configure({
			   tabReplace: '    ', 
			   classPrefix: '',
			  useBR:true

			})
			hljs.initHighlighting();
			 $('pre code').each(function(i, block) {
				//// // console.log("dagn chuan hoa")
			 hljs.highlightBlock(block);
			});
	})
	Template.user.onCreated(function bodyOnCreated() {
		// console.log("click chnua")
		
		this.state = new ReactiveDict();
		console.log("Data is:",this.data);
		//console.log(this.data.params())
		 this.autorun(() => {
			var dataContext = Template.currentData();
			console.log(typeof dataContext)
			
			if(typeof dataContext =="string")
				this.state.set('tagname',dataContext)
			this.state.set('data',dataContext)
			console.log(dataContext)
			//this.subscribe("user1", dataContext);
		  });
        
		

    });
	Template.user.helpers({
	data(){
		const instance = Template.instance();
		return Users.find({tagname: instance.state.get('data') });
	},	
	users(){
		const instance = Template.instance();
		console.log(instance.state.get('tagname'))
		
		if(instance.state.get('tagname').length>0)
		{
			console.log(Users.find({tagname:{ $regex : instance.state.get('tagname'), $options: 'i'}},  {sort: { createdAt: -1 },limit : 10} ).fetch())
			return Users.find({tagname:{ $regex : instance.state.get('tagname'), $options: 'i'}},  {sort: { createdAt: -1 },limit : 10} ).fetch()
		}
		 return Template.currentData();
	 },
	})
	Template.taguser.helpers({
	data(){
		const instance = Template.instance();
		return Users.find({tagname: instance.state.get('data') });
	},	
	users(){
		const instance = Template.instance();
		console.log(instance.state.get('tagname'))
		
		if(instance.state.get('tagname').length>0)
		{
			console.log(Users.find({tagname: instance.state.get('data') },{sort: { createdAt: -1 },limit : 10}).fetch())
			return Users.find({tagname: instance.state.get('data') },{sort: { createdAt: -1 },limit : 10}).fetch()
		}
		 return Template.currentData();
	 },
	})
Template.user.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Users.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    if (confirm('Are you sure you want to delete this thing into the database?')) {
    // Save it!
//	console.log(Meteor.userId())
	//console.log(this.owner)
	if(Meteor.userId()==this.owner)	
	//	console.log("true")
		Users.remove(this._id);
	} else {
		// Do nothing!
	}
	//Users.remove(this._id);
  },
	'click .text'(e, template) {
          var simpleInput = template.find('.col1');

        simpleInput.style.display = 'flex';
	},
    'click .show'(e, template) {
          var simpleInput = template.find('.col1');

        simpleInput.style.display = 'flex';
	},
	'click .close'(e, template) {
        var simpleInput = template.find('.col1');	
        simpleInput.style.display = 'none';
	},
     'submit .edit'(event, template) {
		    event.preventDefault();

            // Get value from form element
            const target = event.target;
			// console.log(target.content1)
            //const text = target.text.value;
			const content1 =target.content1.value;
		 	
			Users.update(this._id, {
				$set: { content:content1 },
			});
  },
});
