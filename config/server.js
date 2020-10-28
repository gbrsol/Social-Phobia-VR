var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine','ejs');
app.set('views','./app/views');

app.use(bodyParser.urlencoded({extended:true}));

// consign deve vir após o express
consign()
    .include('app/routes')
    .then('config/dbConnection.js') // caso não especifique ele entra em loop infinito pois tenta exportar o server.js
    .then('app/models')
    .into(app);

module.exports = app;