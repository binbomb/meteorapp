import { Template } from 'meteor/templating';
import './task.html';
import { Users } from '../../collections/Users.js'; 
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
UI.registerHelper('formatTime', function(context, options) {
		var date = moment(context)
		// console.log(moment(context).format("HH:mm"))
		var now = moment();
		// console.log(moment().format("HH:mm"))
		if (now > date) {
			
			  //if(context&&(moment(context).isBefore(new Date())))
			//	return moment(context).format('MM/DD/YYYY, hh:mm');
			//return "chua dc"  
		   // date is past
		} else {
		   // date is future
		  // return "chua dc" 
		}


  if(context&&(moment(context).isBefore(new Date())))
 //return moment(context).format('MM/DD/YYYY, hh:mm');
	return "chua dc"   
});
/*
var driver = new MongoInternals.RemoteCollectionDriver(
        mongoURL, {
            oplogUrl: oplogURL
        });

var options = {
        _driver: driver,
        _suppressSameNameError: true
    };

var driver2 = new MongoInternals.RemoteCollectionDriver(
        mongoURL2, {
            oplogUrl: oplogURL2
        });

var options2 = {
        _driver: driver2,
        _suppressSameNameError: true
    };
	
	
export const Tasks = new Mongo.Collection('users', options);

*/



Template.task.helpers({

  attributes: function () {
    return {
      name: "myName",
      class: "myClass anotherClass",
      value: 123
    }
  },
  start1(context){
	  	var date = moment(context)
	//	// console.log(moment(context).format("HH:mm"))
		var now = moment();
		//// console.log(moment().format("HH:mm"))

		if (now < date) {
		//	// console.log(date-now)
			var distance=date-now
			  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		   return true
		} else {
		   // date is future
		}
		return false
	//  return 'expried';
  },  countdown(context){
	  	var date = moment(context)
		var now = moment();

			var distance=date-now
			  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			  if(days>29)
				  return moment(context).fromNow()
			  var rs="";//= `con ${days} days : ${hours}h: ${minutes}m : ${seconds}`
			  if(days>0) rs=rs+`con ${days}days`
				if(hours>0) rs=rs+` ${hours}h`
				rs=rs+` ${minutes}m `
			return rs;	
				

  }
  


});
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
	//// console.log(this.tasks[0].text);
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
	'mouseenter  .items'(e,template){
		var toogle = template.find('.items');	
		//toogle.style.display = 'block';
			
	},
	'mouseleave   .items'(e,template){
	
	},
	'click   .aitems'(e,template){
		this.firstNode;
	//	// console.log(this.data)
		//// console.log(e.target)
	},
});
