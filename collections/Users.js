import { Mongo } from 'meteor/mongo';
export const  Users = new Mongo.Collection('users1');
Users.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
/*
UsersSchema= new SimpleSchema({
	name:{
		type: String,
		label:"Name"
	},
	desc:{
		type: String,
		label:"Description"	
	},
	joined:{
		type:Date,
		label:"created",
		autoValue:function(){
			return new Date();
		}
		
	}
	
});
Users.attachSchema(UsersSchema);
*/