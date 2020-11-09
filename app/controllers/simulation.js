module.exports.start_simulation = function(app, req, res, intervention){
    res.render('vr/simulation',{intervencao:intervention});
}
module.exports.sandbox = function(app, req, res, intervention){
    res.render('vr/sandbox',{intervencao:intervention});
}