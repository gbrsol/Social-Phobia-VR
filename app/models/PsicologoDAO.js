function PsicologoDAO(connection){
    this._connection = connection();  
}

PsicologoDAO.prototype.insertPsicologo = function(psi){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologos", function(err, collection){
            collection.insert(psi);
            mongoclient.close();
            res.render("admin/forms/form_add_psicologo", {validacao: {}, campos: {}});
        });
    });
    console.log('Inserido com sucesso!');
}

PsicologoDAO.prototype.getByCRP = function(req, res, psi){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologo", function(err, collection){
            collection.find({crp:psi}).toArray(function(err, result){
                //ret = result;
                //res.render('/forms/form_add_sessao', {psicologo: ret})
                res.send(result)
            });
            mongoclient.close();
        });
    });
    return ret;
}
PsicologoDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologo", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: ret, tipofobia: tipofobia, intervencao: intervencao})
            });
            mongoclient.close();
        });
    });
    return ret;
}

module.exports = function()
{
    return PsicologoDAO;
}