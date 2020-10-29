module.exports = function(app)
{
    //conectar ao banco e fazer query
    app.get('/', function(req, res){
        app.app.controllers.home.index(app, req, res);
    })
}