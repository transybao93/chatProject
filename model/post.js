var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	pTitle: String,
	pContent: String,
	pAuthor: String,
	pCreatedAt: Date,
});

//create model
var Post = mongoose.model('Post', postSchema);