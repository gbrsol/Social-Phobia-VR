module.exports = function(app)
{
    //var intervencaoModel = app.app.models.intervencaoModel(intervencao, connection, function(){
        //conectar ao banco
    app.get('/forms/form_add_intervencao', function(req, res){
            app.app.controllers.admin.formulario_add_intervencao(app, req, res);
        }); 
    app.post('/forms/form_add_intervencao/salvar',function(req, res){
        app.app.controllers.admin.insert_intervencao(app, req, res);
    });
}