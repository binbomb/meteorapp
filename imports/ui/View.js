import { Template } from 'meteor/templating';
import './View.html';
import './task.js';
import './user.js';
import './tag.js';
import './tagss.js';
import './loading.js';
import { Users } from '../../collections/Users.js';
import { Tags } from '../../collections/Tags.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import {Meteor} from "meteor/meteor";
import  hljs  from 'highlight.js';
import '../../imports/startup/accounts-config.js';
import { EventData } from '../../collections/eventdata.js';

const searchnum=5
if(Meteor.isClient) {
    Meteor.subscribe('users1');
	Meteor.subscribe('tags');

Meteor.startup(function () {
	

	/* Your code goes here */ })
	Template.View.onRendered(function(){
		////// // console.log(Template.instance().state)
		 let instance=Template.instance()
		////// // console.log(instance.state.get('load'))
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
			 $('pre code').each(function(i, block) {
				//// // console.log("dagn chuan hoa")
			 hljs.highlightBlock(block);
			});

			 
			 $( document ).ready(function() {

			});
			
				

	
	});

    Template.View.onCreated(function bodyOnCreated() {
		// console.log("click chnua")
		console.log("Data is:",this.data);
		//console.log(this.data.params())
		 this.autorun(() => {
			var dataContext = Template.currentData();
			console.log(dataContext)
			this.subscribe("user1", dataContext);
		  });
        this.state = new ReactiveDict();
		this.state.set('data',this.data.id)

    });
	Template.View.onDestroyed(function () {

	});
    Template.View.helpers({
		data(){
			const instance = Template.instance();
			console.log(instance.state.get('data'))
			console.log(Users.findOne({_id:  instance.state.get('data') }));
			return instance.state.get('data')
		},
		post(){
			const instance = Template.instance();
			console.log(instance.state.get('data'))
			return Users.findOne({_id:  instance.state.get('data') })
		},
		tagsss(){
			return Tags.find({},  {sort: { createdAt: -1 }} );
		},
        tasks()
        {
			// console.log(EventData.find().fetch());
            return EventData.find({},  {sort: { start: 1 }} ).fetch();

        },
        users(){
			// console.log("KHI NAO CHAY")
            const instance = Template.instance();
            if (instance.state.get('hideCompleted')) {
                // If hide completed is checked, filter tasks
                return Users.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
            }

			var	array=instance.state.get('users')
			// console.log(array)
			if(array&&array.length>0)
				return array
			else
				return Users.find({},  {sort: { createdAt: -1 },limit : 5} );
		//	return Session.get('users')
        },
    });
    Template.View.events({

		// event scroll to load more data from database
		'scroll window'(e){
			// console.log(e)
		},
		'click window'(e){
			// console.log("You clicked something");
		},
		'submit .add-tag'(event,instance) {
            // Prevent default browser form submit
            event.preventDefault();
			
            const target = event.target;
            const tagname = target.tagname.value;
			 Tags.insert({
				tagname			
            });

        },	
		'click .row .tag1'(event,instance) {  
            event.preventDefault();      
			//3 to TAG
			instance.state.set('load',3)
			 instance.state.set('loadnum',5)
			var val = $(event.currentTarget).text();
			// console.log(val)
			instance.state.set('key',val)
			if(Users.find({tagname:{'$regex': val, '$options': 'i'}},  {sort: { createdAt: -1 },limit : searchnum} ).fetch().length<1)
					alert("couldn't fing tag in data")
			instance.state.set('users',Users.find({tagname:{'$regex': val, '$options': 'i'}},  {sort: { createdAt: -1 },limit : searchnum} ).fetch());	
			

        }
    });

}
