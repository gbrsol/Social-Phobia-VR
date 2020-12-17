var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
app.set('view engine','ejs');
app.set('views','./app/views','./aframe/html');

app.use(express.static('./app/public/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

app.locals.scriptsSimulacao = function()
{
    //require('app/public/js/vr/scripts.js')
    return require('D:/Git Projects/Social-Phobia-VR/app/public/js/vr/scripts.js')
}

// consign deve vir após o express
consign()
    .include('app/routes')
    .then('config/dbConnection.js') // caso não especifique ele entra em loop infinito pois tenta exportar o server.js
    .then('app/models')
    .then('app/controllers')
    .into(app);
module.exports = app;