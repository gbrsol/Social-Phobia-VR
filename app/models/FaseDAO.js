function FaseDAO(connection){
	this._connection = connection;
}

FaseDAO.prototype.getFases = function(callback){
	this._connection.query('select * from fase', callback);
}

FaseDAO.prototype.getFase = function(id_fase, callback){
	console.log(id_noticia.id_noticia);
	this._connection.query('select * from fase where id = ' + id_fase.id, callback);
}

FaseDAO.prototype.salvarNoticia = function(fase, callback){
	this._connection.query('insert into fase set ? ', fase, callback)
}

module.exports = function(){
	return FaseDAO;
}
