var express = require('express');
var router = express.Router();

/* GET users listing. */
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig');
var userSQL = require('../db/usersql');

var pool = mysql.createPool(dbConfig.mysql);


router.post('/addUser', function(req, res, next){
	pool.getConnection(function(err, connection){
		connection.query(userSQL.insert, [req.body.username, req.body.password], function(err, result){
			if(err) 
				res.sendStatus(500);
			else
				res.sendStatus(200);
			connection.release();
		});
	});
});
router.post('/login', function(req, res, next){
	pool.getConnection(function(err, connection){
		connection.query(userSQL.getPswByName, req.body.username, function(err, result){
			if(result.length != 1 || err)
				res.sendStatus(500);
			else if(result[0]["password"] !== req.body.password)
				res.sendStatus(500);
			else
				res.sendStatus(200);
			connection.release();
		});
	});
});

router.addmsg = function(username, msg, time){
	pool.getConnection(function(err, connection){
		connection.query(userSQL.insertmsg, [username, msg, time], function(err, result){
			connection.release();
		});
	});
};

router.querymsg = function(socket){
	pool.getConnection(function(err, connection){
		connection.query(userSQL.querymsg, [], function(err, result){
			socket.emit('load message', result);
			// console.log(result);
			connection.release();
		});
	});
};

module.exports = router;
