module.exports.fases = function(application, req, res){
	var connection = application.config.dbConnection();
	var faseModel = new application.app.models.FaseDAO(connection);

	faseModel.getFases(function(error, result){
		res.render("admin/form_fase", {fases : result});
	});
}
