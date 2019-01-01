import { Mongo } from 'meteor/mongo';
export const  Tags = new Mongo.Collection('tags');
Tags.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});