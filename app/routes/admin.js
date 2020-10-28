module.exports = function(app)
{
    //var intervencaoModel = app.app.models.intervencaoModel(intervencao, connection, function(){
        //conectar ao banco
    app.get('/forms/intervencao', function(req, res){
            res.render('admin/forms/form_add_intervencao');
        }); 
    app.post('/forms/intervencao/salvar', function(req, res){
        var dados = req.body;

        var connection = app.config.dbConnection();
        var intervencaoModel = new app.app.models.IntervencaoDAO(connection);
        intervaoModel.insertIntervencao(intervencao, connection, function(error, result){
            res.redirect('/forms/intervencao');
        });

        res.send(dados);
    });
}