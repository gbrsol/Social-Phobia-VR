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
    var linha = '{"scene":"'+intervencao["clinical"].toString()+'", "situation":"'+intervencao["situation"].toString()+'"}';
    console.log(linha);
    intervencao["clinical"] = JSON.parse(linha);
    var connection = app.config.dbConnection;
    var IntervencaoDAO = new app.app.models.IntervencaoDAO(connection);
    IntervencaoDAO.insertIntervencao(intervencao);

    //intervecaoDAO.insertIntervencao(dados, connection, function(error, result){
    //    res.redirect('admin/forms/form_add_intervencao');    
    //});

    res.send(intervencao);
}