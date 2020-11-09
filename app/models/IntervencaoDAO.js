function IntervencaoDAO(connection){
    this._connection = connection();  
}

IntervencaoDAO.prototype.insertIntervencao = function(intervencao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.insert(intervencao);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
}

IntervencaoDAO.prototype.get = function(intervencao){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.find({name: intervencao.name}).toArray(function(err, result){
                ret = result;
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}
IntervencaoDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: tipofobia, intervencao: ret})
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

module.exports = function()
{
    return IntervencaoDAO;
}