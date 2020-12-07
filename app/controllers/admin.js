const SessaoDAO = require("../models/SessaoDAO");

//@Intervencao
module.exports.formulario_add_intervencao = function(app, req, res)
{
    res.render('admin/forms/form_add_intervencao',{validacao: {}, campos:{}});
}
module.exports.insert_intervencao = function(app, req, res)
{
    var dados = req.body;
    req.assert('name','Nome é obrigatório').notEmpty();
    req.assert('description','Descrição é obrigatório').notEmpty();
    req.assert('relax','Relaxamento é obrigatório').notEmpty();
    req.assert('transition','Transição é obrigatório').notEmpty();
    req.assert('clinical','Clínico é obrigatório').notEmpty();
    req.assert('situation','Situação é obrigatório').notEmpty();
    
    var erros = req.validationErrors();//req.validationErrors();
    if(erros)
    {
        res.render("admin/forms/form_add_intervencao", {validacao: erros, campos: dados});
        console.log('houve erros de form');
        return;
    }

    var intervencao = dados;
    var linha = '{ "relax: "' + dados.relax + ', "transition": ' +dados.transition + ', "clinical": {' + '"scene": '+ dados.scene + ',"situation": '+ dados.situation +'}, "transition_exit": ' + dados.transition_exit + '}'; 
    console.log(linha);
    intervencao = JSON.parse(linha);
    var connection = app.config.dbConnection;
    var IntervencaoDAO = new app.app.models.IntervencaoDAO(connection);
    IntervencaoDAO.insertIntervencao(intervencao);

    //intervecaoDAO.insertIntervencao(dados, connection, function(error, result){
    //    res.redirect('admin/forms/form_add_intervencao');    
    //});

    //res.send(intervencao);
}
//@Psicologo
module.exports.formulario_add_psicologo = function(app, req, res)
{
    res.render('admin/forms/form_add_psicologo',{validacao: {}, campos:{}});
}
module.exports.insert_psicologo = function(app, req, res)
{
    var dados = req.body;
    req.assert('name','Nome é obrigatório').notEmpty();
    req.assert('crp','CRP é obrigatório').notEmpty();
    req.assert('username','Login é obrigatório').notEmpty();
    req.assert('password','Senha é obrigatório').notEmpty();
    
    var erros = req.validationErrors();
    if(erros)
    {
        res.render("admin/forms/form_add_psicologo", {validacao: erros, campos: dados});
        console.log('houve erros de form');
        return;
    }

    var connection = app.config.dbConnection;
    var PsicologoDAO = new app.app.models.PsicologoDAO(connection);
    PsicologoDAO.insertPsicologo(dados);
    res.send(dados);
}

//@Paciente

module.exports.formulario_add_paciente = function(app, req, res)
{
    res.render('admin/forms/form_add_paciente',{validacao: {}, campos:{}});
}
module.exports.insert_paciente= function(app, req, res)
{
    var dados = req.body;
    req.assert('id','ID hospitalar é obrigatório').notEmpty();
    req.assert('name','nome é obrigatório').notEmpty();
    req.assert('age','idade é obrigatório').notEmpty();
    req.assert('sex','Sexo é obrigatório').notEmpty();
    req.assert('phone','Telefone é obrigatório').notEmpty();
    req.assert('address','Endereço é obrigatório').notEmpty();
    
    var erros = req.validationErrors();
    if(erros)
    {
        res.render("admin/forms/form_add_paciente", {validacao: erros, campos: dados});
        console.log('houve erros de form');
        return;
    }

    var connection = app.config.dbConnection;
    var PacienteDAO = new app.app.models.PacienteDAO(connection);
    PacienteDAO.insertPaciente(dados);
    res.send(dados);
}

//@tipofobia

module.exports.formulario_add_tipofobia = function(app, req, res)
{
    res.render('admin/forms/form_add_tipofobia',{validacao: {}, campos:{}});
}
module.exports.insert_tipofobia= function(app, req, res)
{
    var dados = req.body;
    req.assert('name','Nome é obrigatório').notEmpty();
    req.assert('description','Descrição é obrigatório').notEmpty();

    var erros = req.validationErrors();
    if(erros)
    {
        res.render("admin/forms/form_add_tipofobia", {validacao: erros, campos: dados});
        console.log('houve erros de form');
        return;
    }

    var connection = app.config.dbConnection;
    var TipoFobiaDAO = new app.app.models.TipoFobiaDAO(connection);
    TipoFobiaDAO.insertTipoFobia(dados);
    res.send(dados);
}

//@sessao


module.exports.formulario_add_sessao = function(app, req, res)
{
    var connection = app.config.dbConnection;
    var IntervencaoDAO = new app.app.models.IntervencaoDAO(connection);
    var intervencoes = IntervencaoDAO.getAll();
    res.render('admin/forms/form_add_sessao',{validacao: {}, campos: {}, intervencoes:intervencoes});
}
module.exports.insert_sessao= function(app, req, res)
{
    var dados = req.body;
    req.assert('name','Nome é obrigatório').notEmpty();
    req.assert('crp','CRP é obrigatório').notEmpty();
    req.assert('id','ID de paciente é obrigatório').notEmpty();

    var connection = app.config.dbConnection;
    var IntervencaoDAO = new app.app.models.IntervencaoDAO(connection);
    var intervencoes = IntervencaoDAO.getAll();

    var erros = req.validationErrors();
    if(erros)
    {
        res.render("admin/forms/form_add_sessao", {validacao: erros, campos: dados, intervencoes});
        console.log('houve erros de form');
        return;
    }

    
    var PacienteDAO = new app.app.models.PacienteDAO(connection);
    var PsicologoDAO = new app.app.models.PsicologoDAO(connection);
    var TipoFobiaDAO = new app.app.models.TipoFobiaDAO(connection);
    
    var SessaoDAO = new app.app.models.SessaoDAO(connection);


    var nome = dados.name;
    var paciente = PacienteDAO.get({id:dados.id});
    var psicologo = PsicologoDAO.get({crp:dados.crp});
    var tipo_fobia = TipoFobiaDAO.get({name:dados.tipo_fobia});
    var intervencao = IntervencaoDAO.get({name: dados.intervencao})
    var novo = {nome, paciente, psicologo, tipo_fobia, intervencao};

    SessaoDAO.insertSessao(novo);
    //res.send(novo);
}

module.exports.configurar_sessao = function(app, req, res)
{
    res.render('admin/sessao/configurar_sessao',{validacao: {}, campos:{}, sessoes: {}});
}

module.exports.iniciar_intervencao_nova = function(app, req, res)
{
    res.render('admin/sessao/iniciar_intervencao_nova',{validacao: {}, campos:{}});
}

module.exports.start_simulation = function(app, req, res)
{
    var dados = req.body;
    var json = '{ "relax: "' + dados.relax + ', "transition": ' +dados.transition + ', "clinical": {' + '"scene": '+ dados.scene + ',"situation": '+ dados.situation +'}, "transition_exit": ' + dados.transition_exit + '}'; 
    
    res.render('vr/simulation', { intervencao: {
        "relax":"baloon", 
        "transition": "staircase", 
        "clinical":{
            "scene": "house", 
            "situation": "relative"
            },
        "transition_exit": "staircase"
    }});
}
module.exports.iniciar_salvar_nova_intervencao = function(app, req, res)
{
    var dados = req.body;
    req.assert('name','Nome é obrigatório').notEmpty();
    req.assert('description','Descrição é obrigatório').notEmpty();
    req.assert('relax','Relaxamento é obrigatório').notEmpty();
    req.assert('transition','Transição é obrigatório').notEmpty();
    req.assert('clinical','Clínico é obrigatório').notEmpty();
    req.assert('situation','Situação é obrigatório').notEmpty();
    
    var erros = req.validationErrors();//req.validationErrors();
    if(erros)
    {
        res.render("admin/sessao/iniciar_intervencao_nova", {validacao: erros, campos: dados});
        console.log('houve erros de form');
        return;
    }

    var intervencao = dados;
    var linha = '{ "relax: "' + dados.relax + ', "transition": ' +dados.transition + ', "clinical": {' + '"scene": '+ dados.scene + ',"situation": '+ dados.situation +'}, "transition_exit": ' + dados.transition_exit + '}'; 
    console.log(linha);
    intervencao = JSON.parse(linha);
    var connection = app.config.dbConnection;
    var IntervencaoDAO = new app.app.models.IntervencaoDAO(connection);
    IntervencaoDAO.insertIntervencao(intervencao);
    this.start_simulation(app,res,res);
}