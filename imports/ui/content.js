import { Template } from 'meteor/templating';
import './content.html';
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
	 Meteor.subscribe('EventData');
	// set data

    Session.set('tasks', [
        { text: 'This is task 1' },
        { text: 'This is task 2' },
        { text: 'This is task 3' },
    ]);
Meteor.startup(function () {
	

	/* Your code goes here */ })
	Template.content.onRendered(function(){
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
				// console.log( "ready!" );
				$('#btn1').click(function() {
				  alert( "Handler for .click() called." );
				});
			});
			
				window.addEventListener('scroll', function() { 
				//check offset endpage
				var t=window.pageYOffset+window.innerHeight
				var offsermenu=window.pageYOffset
				if(window.pageYOffset==100)
					{	
						
					
						var menu=document.getElementById("mainmenutop")
						//console.log(menu)
						menu.classList.remove("segment");
						menu.classList.add("scrol");    
					}
				if(window.pageYOffset==0){
						var menu=document.getElementById("mainmenutop")
						
						menu.classList.add("segment");
						menu.classList.remove("scrol");    
				}	
				/*
				if(offsermenu>=300){
					$('#mainmenutop').css('position','fixed')
					$('#mainmenutop').css('top','0px')	
					$('#mainmenutop').css('justify-content','center')
					$('#mainmenutop').css('left','300px')
				}
				else{ 
					$('#mainmenutop').css('position','relative')
					$('#mainmenutop').css('left','0px')
				}
				*/	
				if(t==$(document).height()){
					// console.log("load more data")
					 //const instance = Template.instance();
					 let condition=instance.state.get('load')
					 var array
					 
					//// // console.log(condition)
					 if(condition==1){
						 
						 let n=instance.state.get('loadnum')+5
						 // console.log(n)
						 // console.log(instance.state.get('totalposts'))
						 if(instance.state.get('totalposts')<=searchnum){
							 
							  //// console.log(instance.incompleteCount())
							 
							 instance.state.set('loadnum',n)
						 }
						array=Users.find({},  {sort: { createdAt: -1 },limit : n} ).fetch()
					 }
						 
					else{
						if(condition==2){
							// console.log(instance.state.get('key'))
							var keysearch=instance.state.get('key')
							 let n=instance.state.get('loadnum')+5
							 // console.log(n)
							 // console.log(instance.state.get('totalposts'))
							 if(n-instance.state.get('totalposts')<=searchnum){
								 
								  //// console.log(instance.incompleteCount())
								 
								 instance.state.set('loadnum',n)
							 }
							//array=Users.find($or: [{content:{'$regex': instance.state.get('key'), '$options': 'i'},{text:{'$regex': instance.state.get('key'), '$options': 'i'}}],  {sort: { createdAt: -1 },limit : 10} ).fetch()
							array=Users.find({ $or: [
										{ content:{ $regex : keysearch, $options: 'i'} }
										, { text:{$regex: keysearch, $options: 'i'} } 
									] },{sort: { createdAt: -1 },limit : n}).fetch()
							
						}
						else if(condition==3) {
							 let n=instance.state.get('loadnum')+5
							 // console.log(n)
							 // console.log(instance.state.get('totalposts'))
							 if(n-instance.state.get('totalposts')<=searchnum){
								 
								  //// console.log(instance.incompleteCount())
								 
								 instance.state.set('loadnum',n)
							 }
							array=Users.find({tagname:{ $regex : instance.state.get('key'), $options: 'i'}},  {sort: { createdAt: -1 },limit : n} ).fetch()
						}
							
					}
					// console.log(array)
					instance.state.set('users',array)
					instance.state.set('hideCompleted', event.target.checked);

				}
					
				
			 });

	
	});

    Template.content.onCreated(function bodyOnCreated() {
		// console.log("click chnua")
		
		 this.autorun(() => {
			var dataContext = Template.currentData();
			console.log(dataContext)
			this.subscribe("user1", dataContext);
		  });
		  
        this.state = new ReactiveDict();
		//const template=Template.instance();
		//1 search main
		this.state.set('load',1)
		this.state.set('loadnum',5)
		// console.log(new Date().toISOString())
		// console.log(Users.find({start:{$lte:new Date().toISOString()}},  {sort: { createdAt: -1 },limit : 10} ).fetch() )
		//    instance.state.set('users',Users.find({},  {sort: { createdAt: -1 },limit : 10} ).fetch() );
		
    });
	Template.content.onDestroyed(function () {
		window.removeEventListener('scroll', function() { 
			
		})/**/
	});
    Template.content.helpers({
		tagsss(){
			return Tags.find({},  {sort: { createdAt: -1 }} );
		},
        tasks()
        {
			// console.log(EventData.find().fetch());
            return EventData.find({},  {sort: { start: 1 }} ).fetch();

        },
        users(){
			if(typeof  Template.currentData()!="undefined")
			{
				let ob=Template.currentData()
				console.log(ob.key)
				if(typeof ob.key!="undefined"){
					
					var array= Users.find({ $or: [
						{ content:{ $regex : ob.key, $options: 'i'} }
						, { text:{$regex: ob.key, $options: 'i'} } 
						] },{sort: { createdAt: -1 },limit : 10}).fetch()
						console.log(array)
					return 	array
				}
				else return Users.find({tagname:{ $regex : ob, $options: 'i'}},  {sort: { createdAt: -1 },limit : 10} ).fetch()
			}
			console.log(Users.find({},  {sort: { createdAt: -1 },limit : 5} ).fetch())
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
				return Users.find({},  {sort: { createdAt: -1 },limit : 5} ).fetch();
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
    Template.content.events({
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
			//// console.log(val)
			//// console.log(val.css('display'))
			
			if(val.css('display') == 'block')
				val.css('display', 'none');
			else val.css('display', 'block');

        },	
    });

}
