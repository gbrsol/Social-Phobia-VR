module.exports = function(app)
{
    //conectar ao banco e fazer query
    app.get('/', function(req, res){
        res.render('home/index')
    })
}