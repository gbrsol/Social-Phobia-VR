var mongodb = require('mongodb');
var dbConnection = function(){
    //funções de banco
    console.log('Entrou na conexão');
    var db = new mongodb.Db('spvr', new mongodb.Server('localhost',27017,{}),{});
    return db;
}
module.exports = function()
{
    return dbConnection;
}