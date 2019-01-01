import './app.html';
import './loading.js';
import './task.js';
import './user.js';
import './tag.js';
import './tagss.js';
import './loading.js';
import { Users } from '../../collections/Users.js';
import { Tags } from '../../collections/Tags.js';
import { EventData } from '../../collections/eventdata.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import {Meteor} from "meteor/meteor";
    Meteor.subscribe('users1');
	Meteor.subscribe('tags');
	 
Template.App.onCreated(function AppOnCreated() {
	 this.autorun(()=>{
			var dataContext = Template.currentData();
			console.log(dataContext)
			this.subscribe("user1", dataContext);
		  });
		  
        this.state = new ReactiveDict();
	 this.state.set('load',1)
	 this.state.get('load')
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
/*
  Meteor.defer(() => {
    FlowRouter.go('one');
  });
  */
});
Template.App.onRendered(function(){
		window.addEventListener('scroll', function() { 
	//	console.log(window.pageYOffset)

	})
})
  Template.App.helpers({
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
        incompleteCount() {
			// console.log("set count 5")
			const instance = Template.instance();
			//// console.log(instance.state.get('users'))
			var array=instance.state.get('users')
			
			if(array&&array.length>0){
				instance.state.set('totalposts',array.length)
				return array.length;
			}
				
			instance.state.set('totalposts',5)
			return 5;
        },
    });
	Template.App.onDestroyed(function () {
			window.removeEventListener('scroll', function() { 
				
			})/**/
	});
	Template.App.events({
        'submit .new-task'(event,instance) {
            // Prevent default browser form submit
            event.preventDefault();
            // Get value from form element
            const target = event.target;
            const text = target.text.value;
			const urlimg=target.urlimg.value;
			const content =target.content.value;
			const tagname =target.tagname.value;
            // Insert a task into the collection 
    /*  */      Users.insert({
                text,
                createdAt: new Date(), // current time
                owner: Meteor.userId(),
                username: Meteor.user().username,
				content:content,
				boximg:urlimg,	
				tagname
            });
			instance.state.set('users',Users.find({},  {sort: { createdAt: -1 },limit : searchnum} ).fetch());	
            // Clear form
			target.urlimg.value = '';
            target.text.value = '';
			target.content.value='';
			

        },
        'change .hide-completed input'(event, instance) {


            instance.state.set('hideCompleted', event.target.checked);
        },
		// event scroll to load more data from database
		'scroll window'(e){
			// console.log(e)
		},
		'click window'(e){
			// console.log("You clicked something");
		},
		'click  .switch input'(e,template){
			//e.preventDefault()
			//// console.log($(e.target))
			//// // console.log(template.firstNode)
			// console.log(template.data) 
			var toogle = template.find('.toogle-menu');	// console.log(toogle)
			//$(e.target).parent().next('.items').toggle(500);
			// console.log($(e.target).parent().next('.items'))
			// console.log(toogle.style.display)
			if(toogle.style.display == 'block')
				toogle.style.display = 'none';
			else toogle.style.display = 'block'
			var toogle1 = template.find('.items');	
			// console.log(toogle1)
		//	toogle1.style.display = 'block';
		},
		'mouseleave .switch'(e,template){
				var toogle = template.find('.toogle-menu');	
			//toogle.style.display = 'none';
		},
		'submit .new-search'(event,instance) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
			$( document ).ready(function() {
				document.documentElement.scrollTop=0

			});

			//2 to search
			instance.state.set('load',2)
			 instance.state.set('loadnum',5)
            const target = event.target;
            const keysearch = target.keysearch.value;
			var params = {cat: "meteor", id: "abc"};
			var queryParams = {key: keysearch};
			FlowRouter.go("/search", params, queryParams);
			// console.log(keysearch)
			//var array= Users.find({content:{'$regex': keysearch, '$options': 'i'}},  {sort: { createdAt: -1 },limit : 1} ).fetch()
			instance.state.set('key',keysearch)
		/*	var array=Users.find("$or": [
										{content:{'$regex': keysearch, '$options': 'i'}}
										,{text:{'$regex':keysearch, '$options': 'i'}}
							],{sort: { createdAt: -1 },limit : 10}).fetch()
			
			
							*/
				var array= Users.find({ $or: [
									{ content:{ $regex : keysearch, $options: 'i'} }
									, { text:{$regex: keysearch, $options: 'i'} } 
									] },{sort: { createdAt: -1 },limit : 10}).fetch()
			// console.log(array)
			if(array.length==0){
				instance.state.set('load',1)
				alert("couldn't find result")
			}
			instance.state.set('users',array);
			//Session.set('users',Users.find({content:{'$regex': keysearch, '$options': 'i'}},  {sort: { createdAt: -1 },limit : 5} ).fetch())
            // Clear form
			 //target.keysearch.value= '';
			//loadmore khi searxch

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
		'click .row .tag12'(event,instance) {  
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
			

        },		
		'click .new-task .tag1'(event,instance) {  
            event.preventDefault();      

			const val = $(event.currentTarget).text();
			const target = instance.find('.new-task');
			if(target.tagname.value.trim()=="")
				target.tagname.value=val;
			else{				
				if(target.tagname.value.indexOf(val)<0)
					target.tagname.value=target.tagname.value+","+val;
			}						
        },	

		'click .co .circular'(event,instance) { 
			const val = $(event.currentTarget).text();
		//// console.log(val)
			const toogle = instance.find('.child');
			if(toogle.style.display == 'block')
				toogle.style.display = 'none';
			else toogle.style.display = 'block'
			 
        },
		'click .container h1'(event,instance) { 
			const val = $(event.currentTarget).next();			
			if(val.css('display') == 'block')
				val.css('display', 'none');
			else val.css('display', 'block');

        },	
    })