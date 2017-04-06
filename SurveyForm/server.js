// Survey Form - Server.JS
var express = require("express");
var app = express();
var path = require("path"); // for standard path routing

var bodyParser = require('body-parser');  // for processing POST data
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "./static")));  // static content
app.set('views', path.join(__dirname, './views'));  // views folder w/EJS files
app.set('view engine', 'ejs');

// root route
app.get('/', function (req, res){
  res.render('index');
});

// return from Results page
app.post('/', function (req, res){
  res.redirect('/');
});

// Form Post Data processing route
app.post('/result', function (req, res){
    console.log("POST DATA \n", req.body)
    res.render('result', {user: req.body})
})

app.listen(8000, function() {
  console.log("listening on port 8000");
});
