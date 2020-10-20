module.exports.fase = function(application, req, res){
	var connection = application.config.dbConnection();
	var tfModel = new application.app.models.TipoFobiaDAO(connection);

	var id_tf = req.query;

	noticiasModel.getFase(id_tf, function(error, result){
		res.render("tipo_fobia/tipo_fobia", {tipo_fobia : result});
	});
}
