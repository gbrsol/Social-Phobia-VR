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
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            var sess = collection.find({paciente: sessao.paciente.name}).toArray();
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

SessaoDAO.prototype.getAll = function(res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            var sess = collection.find({}).toArray(function(err, result){
                //res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: tipofobia, intervencao: intervencao})
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

module.exports = function()
{
    return SessaoDAO;
}