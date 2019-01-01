import { Meteor } from 'meteor/meteor';
import { Users }  from '../collections/Users.js';
import { Tags }  from '../collections/Tags.js';
import { EventData }  from '../collections/eventdata.js';
Meteor.startup(() => {
  // code to run on server at startup
//Users.insert({ Name: "Hello world! dong thj 2", created: new Date() });
//Users.insert({ text: "Hello world!2", createdAt: new Date() });




if ( Meteor.isServer ) {
    /*	... */
	Meteor.publish('users1', function () {
          return Users.find({});
	});
	Meteor.publish('tags', function () {
	  return Tags.find({});
	});
	Meteor.publish('EventData', function () {
	  return EventData.find({});
	});
}
	
});
