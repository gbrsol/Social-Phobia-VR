function PsicologoDAO(connection){
    this._connection = connection();  
}

PsicologoDAO.prototype.insertPsicologo = function(psi){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologos", function(err, collection){
            collection.insert(psi);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
}

PsicologoDAO.prototype.get = function(psi){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologo", function(err, collection){
            collection.find({crp:psi.crp}).toArray(function(err, result){
                ret = result;
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
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
    console.log('Inserido com sucesso!');
    return ret;
}

module.exports = function()
{
    return PsicologoDAO;
}