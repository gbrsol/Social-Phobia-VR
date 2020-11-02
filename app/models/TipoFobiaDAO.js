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

TipoFobiaDAO.prototype.getTipoFobia = function(tipo){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            var ret = collection.findOne(tipo);
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

module.exports = function()
{
    return TipoFobiaDAO;
}