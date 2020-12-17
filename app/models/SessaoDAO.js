function SessaoDAO(connection){
    this._connection = connection();  
}

SessaoDAO.prototype.insertSessao = function(sessao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            collection.insert(sessao);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
}

SessaoDAO.prototype.get = function(sessao){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            collection.find({paciente: sessao.paciente.name}).toArray(function(err, result){
                //res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: tipofobia, intervencao: intervencao})
                ret = result;
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}
SessaoDAO.prototype.validateAllFields = function(paciente, psicologo, tipofobia, intervencao)
{
    var ret_paciente, ret_psicologo, ret_tipofobia, ret_intervencao;
    ret_paciente = new app.app.models.IntervencaoDAO(this._connection).get(paciente);
    ret_psicologo = new app.app.models.PsicologoDAO(this._connection).get(psicologo);
    ret_intervencao = new app.app.models.IntervencaoDAO(this._connection).get(intervencao);
    if(ret_paciente.id == paciente && ret_intervencao.name == intervencao && ret_psicologo.crp == psicologo)
        return true;
    return false;
}

SessaoDAO.prototype.getAll = function(req, res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            collection.find({}).toArray(function(err, result){
                //res.render('forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: tipofobia, intervencao: intervencao})
                //ret = result;
                console.log(result)
                res.render('admin/sessao/configurar_sessao',{validacao:{}, campos:{}, sessoes: result})
            });
            mongoclient.close();
        });
    });
    
    //return ret;
}

SessaoDAO.prototype.iniciarSessao = function(sessao, res){
    // dar getAll e voltar à página
    res.render('simulation', {intervencao: sessao.intervencao})
}

module.exports = function()
{
    return SessaoDAO;
}