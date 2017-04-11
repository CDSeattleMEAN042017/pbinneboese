// Require Mongoose for MongoDB
var fs = require("fs")
var path = require("path")
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  // override Mongoose deprecated Promise operator
mongoose.connect('mongodb://localhost/api_db'); // connect to basic_mongoose database

var models_path = path.join(__dirname, "../models")
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf(".js") >= 0){
		require(path.join(models_path, file))
	}
})
