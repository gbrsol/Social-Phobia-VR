module.exports.noticias = function(application, req, res){
	var connection = application.config.dbConnection();
	var faseModel = new application.app.models.FaseDAO(connection);

	faseModel.getFases(function(error, result){
		res.render("fases/fases", {fase : result});
	});
}

module.exports.noticia = function(application, req, res){
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.FaseDao(connection);

	var id_fase = req.query;

	faseModel.getFase(id_noticia, function(error, result){
		res.render("fases/fase", {fase : result});
	});
}
