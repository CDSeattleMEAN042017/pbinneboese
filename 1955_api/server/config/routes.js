var names = require('../controllers/controller');

module.exports = function(app) {
app.get('/', names.index); // display all names
app.get('/:name', names.detail); // show detail
app.get('/new/:name/', names.new); // create name
app.get('/remove/:name/', names.remove);  // remove name
}
