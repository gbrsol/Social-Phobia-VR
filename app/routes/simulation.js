module.exports = function(app)
{
    //conectar ao banco e fazer query
    app.get('/simulation', function(req, res){
        app.app.controllers.admin.start_simulation(app, req, res);
    })
    app.get('/sandbox', function(req, res){
        app.app.controllers.simulation.sandbox(app, req, res);
    })
}