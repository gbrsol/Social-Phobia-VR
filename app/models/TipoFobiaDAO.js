function TipoFobiaDAO(connection){
    this._connection = connection();  
}

TipoFobiaDAO.prototype.insertTipoFobia = function(tipo){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.insert(tipo);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
}

TipoFobiaDAO.prototype.get = function(tipo){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.find(tipo).toArray(function(err, result){
                ret = result;
                //response.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: ret, intervencao: intervencao})
            });
            mongoclient.close();
        });
    });
    return ret;
}

TipoFobiaDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: ret, intervencao: intervencao})
            });
            mongoclient.close();
        });
    });
    return ret;
}

module.exports = function()
{
    return TipoFobiaDAO;
}