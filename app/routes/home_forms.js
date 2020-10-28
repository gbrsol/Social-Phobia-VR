module.exports = function(app)
{
    //conectar ao banco
    app.get('/forms', function(req, res){
        res.render('admin/forms/home_forms');
    });
}