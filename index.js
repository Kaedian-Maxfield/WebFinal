var express = require('express');
var pug = require('pug');
var path = require('path');
var route = require('./route.js')

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname+'/public')));

app.get('/', route.index);

app.listen(3000);