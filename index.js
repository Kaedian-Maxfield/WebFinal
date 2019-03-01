var express = require('express');
var pug = require('pug');
var path = require('path');
var route = require('./route.js')

var app = express();

app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));

app.get('/', route.index);

app.get('/create', route.create);

app.listen(3000);