module.exports.start_simulation = function(app, req, res, intervention){
    res.render('vr/simulation',{intervencao:intervention});
}