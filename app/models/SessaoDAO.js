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

SessaoDAO.prototype.getSessao = function(sessao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("sessoes", function(err, collection){
            var ret = collection.findOne(sessao);
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