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

IntervencaoDAO.prototype.getIntervencao = function(intervencao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            var ret = collection.findOne(intervencao);
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