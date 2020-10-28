var dbCon = require('../../config/dbConnection');
module.exports = function(app)
{
    connection = dbCon();
    
    app.get('/relatorios/intervencao', function(req, res){
        res.render('admin/relatorios/relatorio_intervencao');
    })
}