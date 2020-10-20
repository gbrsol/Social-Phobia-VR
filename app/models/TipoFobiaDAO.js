function TipoFobiaSocialDAO(connection){
	this._connection = connection;
}

TipoFobiaSocialDAO.prototype.getFases = function(callback){
	this._connection.query('select * from tipo_fobia', callback);
}

TipoFobiaSocialDAO.prototype.getFase = function(id_fobia, callback){
	console.log(id_noticia.id_noticia);
	this._connection.query('select * from tipo_fobia where id = ' + id_fobia.id, callback);
}

TipoFobiaSocialDAO.prototype.salvarNoticia = function(fobia, callback){
	this._connection.query('insert into tipo_fobia set ? ', fobia, callback)
}

module.exports = function(){
	return TipoFobiaSocialDAO;
}
