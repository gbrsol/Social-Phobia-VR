var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '1234',
		database : 'SPVR'
	});
}

module.exports = function () {
	return connMySQL;
}
