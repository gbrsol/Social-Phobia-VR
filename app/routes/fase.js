module.exports = function(application) {

	application.get('/fases', function(req, res){
		application.app.controllers.fases.fases(application, req, res);
	});

	application.get('/fase', function(req, res){
		application.app.controllers.fases.fase(application, req, res);
	});

};
