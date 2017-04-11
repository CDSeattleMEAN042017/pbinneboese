// Require the Express Module
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Setting our Static & Views Folders
app.use(express.static(path.join(__dirname, "./node_modules")));
// app.use(express.static(path.join(__dirname, './client/static')));
// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})
