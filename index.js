var express = require('express');
var pug = require('pug');
var path = require('path');
var route = require('./route.js')
var session = require('express-session');

var app = express();

app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));
app.use(session({secret: 'its secret'}));

app.get('/', route.index);

app.get('/create', route.create);

app.get('/ptest', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });
app.listen(3000);