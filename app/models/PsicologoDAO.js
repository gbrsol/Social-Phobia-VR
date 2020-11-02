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

PsicologoDAO.prototype.getPsicologo = function(psi){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("psicologo", function(err, collection){
            var ret = collection.findOne({crp:psi.crp});
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