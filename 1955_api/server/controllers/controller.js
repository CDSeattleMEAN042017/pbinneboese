var mongoose = require("mongoose");
var Name = mongoose.model("Name");

module.exports = {
	// Display All Names route
	index: function(req, res) {
		console.log('root /');
		// fetch names collection from database
		Name.find({}, function(err, names) {
			if(err) { // error handling callback
				console.log('DB read error', err.errors.name.message);
				names = {}; // blank out the names
			}
			// console.log('Names', names);
			res.json(names);
		})
	},

	// New Name route
	new: function(req, res) {
		var name = req.params.name;
		console.log('new /name', name);
		// see if name already exists
		Name.findOne({name:name}, function(err, thisName) {
			if(thisName) { // error handling callback
				console.log('Name already exists');
				res.json(thisName);
			}
			else {	// add new name
				var newName = new Name({name: name});
				newName.save(function(err) {
					if(err) { // error handling callback
						console.log('DB write error', err.errors.name.message);
					} else {
						console.log('name added');
					}
					res.json(newName);
				})
			}
		})
	},

	// Name Detail route
	detail: function(req, res) {
		var name = req.params.name;
		console.log('detail /name', name);
		Name.findOne({name:name}, function(err, thisName) {
			if(err) { // error handling callback
				console.log('DB read error', err.errors.name.message);
				thisName = {}; // blank out the name
			}
			// console.log('Name', thisName);
			res.json(thisName);
		})
	},

	// Delete Name route
	remove: function(req, res) {
		var name = req.params.name;
		console.log('remove /name', name);
		Name.remove({name:name}, function(err) {
			if(err) { // error handling callback
				console.log('DB write error', err.errors.name.message);
			}
			else {
				console.log('name removed');
			}
		})
	}

}
