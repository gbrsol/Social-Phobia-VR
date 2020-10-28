var app = require('./config/server');

var rotaForms = require('./app/routes/home_forms')(app);

var rotaHome = require('./app/routes/home')(app);

var rotaRel = require('./app/routes/relatorio_intervencoes')(app);

app.listen(3000, function(){
    console.log('Server on');
});