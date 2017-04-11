var mongoose = require('mongoose');

var NameSchema = new mongoose.Schema({
	name: {type: String, required: true, maxlength: 80}
})
mongoose.model('Name', NameSchema);
