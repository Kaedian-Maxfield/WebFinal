var express = require('express');
var pug = require('pug');
var path = require('path');
var route = require('./route.js')
var session = require('express-session');
var bodyParser = require("body-parser");

var app = express();

app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));
app.use(session({secret: 'its secret'}));
app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({
     extended: true
});
app.use(bodyParser.json());

app.get('/', route.index);
app.post("/", route.onIndex);

app.get('/create', route.create);
app.post('/create', route.onCreate);

app.get('/edit/:id', route.edit);
app.post('/edit/:id', urlencodedParser, route.editPerson);

app.get('/login', route.login);
app.post('/login', route.onLogin);

app.get('/logout', route.logout);

app.listen(3000);