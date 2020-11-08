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

    app.get('/forms/form_add_psicologo', function(req, res){
        app.app.controllers.admin.formulario_add_psicologo(app, req, res);
    }); 
    app.post('/forms/form_add_psicologo/salvar',function(req, res){
        app.app.controllers.admin.insert_psicologo(app, req, res);
    }); 

    app.get('/forms/form_add_paciente', function(req, res){
        app.app.controllers.admin.formulario_add_paciente(app, req, res);
    }); 
    app.post('/forms/form_add_paciente/salvar',function(req, res){
        app.app.controllers.admin.insert_paciente(app, req, res);
    });

    app.get('/forms/form_add_tipofobia', function(req, res){
        app.app.controllers.admin.formulario_add_tipofobia(app, req, res);
    }); 
    app.post('/forms/form_add_tipofobia/salvar',function(req, res){
        app.app.controllers.admin.insert_tipofobia(app, req, res);
    });

    app.get('/forms/form_add_sessao', function(req, res){
        app.app.controllers.admin.formulario_add_sessao(app, req, res);
    }); 
    app.post('/forms/form_add_sessao/salvar',function(req, res){
        app.app.controllers.admin.insert_sessao(app, req, res);
    });

    app.get('/sessao/configurar_sessao', function(req, res){
        app.app.controllers.admin.configurar_sessao(app, req, res);
    }); 
}