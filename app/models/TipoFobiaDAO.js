function TipoFobiaDAO(connection){
    this._connection = connection();  
}

TipoFobiaDAO.prototype.insertTipoFobia = function(tipo){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.insert(tipo);
            mongoclient.close();
            res.render("admin/forms/form_add_tipofobia", {validacao: {}, campos: {}});
        });
    });
    console.log('Inserido com sucesso!');
}

TipoFobiaDAO.prototype.get = function(req, res, tipo){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.find(tipo).toArray(function(err, result){
                res.send(result)
            });
            mongoclient.close();
        });
    });
}

TipoFobiaDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("tipo_fobia", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                res.render('admin/forms/form_add_intervencao', {validacao: {}, campos:{}, tipo_fobia: result})
            });
            mongoclient.close();
        });
    });
    return ret;
}

module.exports = function()
{
    return TipoFobiaDAO;
}