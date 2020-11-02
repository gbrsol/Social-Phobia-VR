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

PacienteDAO.prototype.getPaciente = function(paciente){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("pacientes", function(err, collection){
            var ret = collection.findOne(paciente);
            mongoclient.close();
        });
    });
    return ret;
}

module.exports = function()
{
    return PacienteDAO;
}