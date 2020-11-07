module.exports = function(app)
{
    //conectar ao banco e fazer query
    app.get('/simulation/start', function(req, res){
        app.app.controllers.simulation.start_simulation(app, req, res);
    })
}