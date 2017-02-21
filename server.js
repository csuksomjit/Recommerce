const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var flash    = require('connect-flash');
var passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser')


// var local = require('passport-local');
var session = require('express-session');
var mongoose = require('mongoose');
var User = require('./server/models/user');
// var MongoStore = require('connect-mongostore')(express);
// Get our API routes
const api = require('./server/routes/api');
const app = express();

// connect to mongo
// mongoose.connect('mongodb://localhost:27017/Recommerce');
var options = {
  user: 'apiromz',
  pass: '023799640'
}
mongoose.connect('mongodb://apiromz:023799640@ds133348.mlab.com:33348/recommerce',{server:{auto_reconnect:true}});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('reconnected', function () {
console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
console.log('MongoDB disconnected!');
mongoose.connect('mongodb://apiromz:023799640@ds133348.mlab.com:33348/recommerce', {server:{auto_reconnect:true}});
});
db.once('open', function() {
  console.log("connection successful");
});
///////////////////




app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.session({
//     secret: 'my secret',
//     store: new MongoStore({'db': 'sessions'})
//   }));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// for encrpyt password
// var myPlaintextPassword = "023799640";
// const saltRounds = 10;
// var salt = bcrypt.genSaltSync(saltRounds);
// var hash = bcrypt.hashSync(myPlaintextPassword, salt);
// console.log(hash);
// var check = bcrypt.compareSync(myPlaintextPassword, hash);
// console.log(check);
// User.find({'username':'apiromz'},function(error,obj){
// 	if(error) console.log(error);
// 		if(bcrypt.compareSync('023799640', obj[0].password)){
// 			console.log('correct');
// 		}else{
// 			console.log('wrong!!');
// 		}
// })
app.post('/login',function(req,res){

	console.log("login checking processing..");
	data = {
					login:false
				}
	User.find({'username':req.body.username},function(err,obj){
		if(err) console.log(err);
		if(obj.length!=0){
			if(bcrypt.compareSync(req.body.password, obj[0].password)){
				data = {
					login:true,
					data :obj[0]
				}
				res.json(data);
			}else{
				
				res.json(data);
			}
		}else{
			res.json(data);
		}
	})
})
// var myPlaintextPassword = "12345";
// const saltRounds = 10;
// var salt = bcrypt.genSaltSync(saltRounds);
// var hash = bcrypt.hashSync(myPlaintextPassword, salt);
// console.log(hash);
// if(bcrypt.compareSync('023799640', hash)){
// 	console.log('same password');
// }else{
// 	console.log('not same password')
// }
app.post('/addCart',function(req,res){
	User.find({'username':req.body.username},function(err,obj){
		if(err)console.log(err);
		obj=obj[0];
		obj.carts.set(obj.carts.length,req.body.item);
		obj.markModified('Object');
		obj.save(function(err,result){
			if(err){
				console.log(err);
				res.send(false);
			} 
			res.send(true);
		});
	});
});
app.post('/api/deleteItem',function(req,res){
    User.find({'username':req.body.username},function(err,obj){
        if(err)console.log(err);
        obj= obj[0];
        obj.carts.splice(req.body.item, 1);
        obj.markModified('Object');
        obj.save();
        res.send(obj);
    });
})
app.post('/register',function(req,res){
	console.log("Register checking processing..");
	console.log(req.body);
	User.find({'username':req.body.username},function(err,obj){
		if(err)console.log('It\'s error : ',err);
		if(obj.length == 0){
			console.log('can register');
			var myPlaintextPassword = req.body.password;
			const saltRounds = 10;
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(myPlaintextPassword, salt);
			var user = new User({
				username:req.body.username,
				password:hash,
				name:req.body.name,
				email:req.body.email,
				buys:[],
				carts:[],
			})
			user.save();
			res.send(true);
		}else{
			console.log('cannot register');
			res.send(false);
		}
	})

	// console.log("login processing..");
	// // res.send(200);
	// console.log(req.body);
	// res.send(req.body);
// 	// User.find({'username':req.username},function(err,obj){
// 	// 	if(err) console.log(err);
// 	// 	if(bcrypt.compareSync(req.password, hash)){
// 	// 		res.send(200);
// 	// 	}else{
// 	// 		res.send(404);
// 	// 	}
// 	// })

})
// example to create user
// var test = new User({
// 	username:"apiromz",
// 	password:"023799640",
// 	name:"Sam",
// 	gender:"male",
// 	buys: [],
// });

// test.save(function(err,obj){
// 	if(err)console.log(err);
// });

// Parsers for POST data





// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname,'src')));

// Set our api routes
app.use('/api', api);


app.get('*', (req, res) => {
	  // res.cookie('name','value');
	  // res.cookie('login',{
	  // 	'id':'apiromz',
	  // 	'password':'023799640'
	  // })
	  // console.log('Cookies: ', req.cookies);
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

// Catch all other routes and return the index file

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));