// Require the Express Module
var express = require('express');
var app = express();
// Require Mongoose for MongoDB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // override Mongoose deprecated Promise operator
mongoose.connect('mongodb://localhost/message_board'); // connect to database

// define Schema variable
var Schema = mongoose.Schema;
// define Post Schema
var PostSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type: String, required: true},
	_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });
// define Comment Schema
var CommentSchema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 4},
	text: {type: String, required: true},
	_post: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {timestamp: true });
// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static & Views Folders
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Routes
// Root Request - Display Posts
app.get('/', function(req, res) {
	Post.find({}, false, true).populate('_comments').exec(function(err, posts) {
		if(err) { // error handling callback
			console.log('DB read failure', err.errors.name.message);
			posts = {}; // blank out the posts
		}
		res.render('index', {posts:posts});
	})
})

// Create Post POST route
app.post('/newpost', function(req, res) {
	// console.log("POST DATA", req.body);
	var post = new Post({name:req.body.name, text: req.body.text});
	// save to dB
	post.save(function(err) {
		if(err) { // error handling callback
			console.log('DB write failure', err.errors.name.message);
		} else {
			console.log('successfully added post', req.body.text);
		}
		res.redirect('/');
	})
})

// route for creating one comment with the parent post id
app.post('/newcomment/:id', function (req, res) {
	// console.log("COMMENT DATA", req.body);
	// fetch the post
	Post.findOne({_id: req.params.id}, function(err, post) {
		// create the comment
		var comment = new Comment({name:req.body.name, text:req.body.text});
		comment._post = post._id;
		post._comments.push(comment);
		// console.log('Comment', comment._id, comment._post);
		// console.log('Post', post._id, post._comments);
		comment.save(function(err) {
			if(err) {
				console.log('DB write failure', err.errors.name.message);
			}
			else {
				post.save(function(err) {
					if(err) {
						console.log('DB write failure', err.errors.name.message);
					}
					else {
						console.log('successfully added comment', req.body.text);
					}
				})
			}
		})
		res.redirect('/');
	})
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})
