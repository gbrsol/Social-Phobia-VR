function PacienteDAO(connection){
    this._connection = connection();  
}

PacienteDAO.prototype.insertPaciente = function(paciente){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("pacientes", function(err, collection){
            collection.insert(paciente);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
}

PacienteDAO.prototype.get = function(paciente){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("pacientes", function(err, collection){
            collection.find(paciente).toArray(function(err, result){
                ret = result;
            });
            mongoclient.close();
        });
    });
    return ret;
}
PacienteDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("pacientes", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                res.render('/forms/form_add_sessao', {paciente:ret, psicologo: psicologo, tipofobia: tipofobia, intervencao: intervencao})
            });
            mongoclient.close();
        });
    });
    return ret;
}

module.exports = function()
{
    return PacienteDAO;
}