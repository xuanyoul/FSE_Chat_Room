var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dateTime = require('node-dateTime');



var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var room = require('./routes/room');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(socket){
		console.log('user disconnected');
	});
	
	socket.on('query message', function(){
		users.querymsg(socket);
	});
	
	socket.on('chat message', function(data){
		var dt = dateTime.create();
		var formatted = dt.format('Y-m-d H:M:S').toString();

		users.addmsg(data.username, data.msg, formatted);
		io.emit('chat message', {username: data.username, msg: data.msg, realtime: formatted});
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
//app.set('view engine', 'jade');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/signup',signup);
app.use('/room',room);


/*app.get('/signup',function(req,res){
    res.render('signup',{
    });
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(8080, function(){
	console.log('listening on * : 8080');
});
module.exports = app;
