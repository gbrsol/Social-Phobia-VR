function IntervencaoDAO(connection){
    this._connection = connection();  
}

IntervencaoDAO.prototype.insertIntervencao = function(intervencao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.insert(intervencao);
            mongoclient.close();
            res.render('admin/forms/form_add_intervencao',{validacao: {}, campos: {}})
        });
    });
    console.log('Inserido com sucesso!');
}

IntervencaoDAO.prototype.get = function(req, res, intervencao){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.find({name: intervencao.name}).toArray(function(err, result){
                res.send(result)
            });
            mongoclient.close();
            res.render("admin/forms/form_add_intervencao", {validacao: {}, campos: {}});
        });
    });
    console.log(ret)
}


IntervencaoDAO.prototype.getAll = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.find({}).toArray(function(err, result){
                ret = result;
                //res.render('/forms/form_add_sessao', {paciente:paciente, psicologo: psicologo, tipofobia: tipofobia, intervencao: ret})
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

IntervencaoDAO.prototype.getAllInter = function(res){
    var ret;
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("intervencoes", function(err, collection){
            collection.find({}).toArray(function(err, result){
                if(!err)
                {
                    console.log(result)
                    res.render('admin/forms/form_add_sessao', {validacao: {}, campos: {}, intervencoes:result})
                }
            });
            mongoclient.close();
        });
    });
    console.log('Inserido com sucesso!');
    return ret;
}

module.exports = function()
{
    return IntervencaoDAO;
}