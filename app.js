	"use strict";
const app = require('express')();
const ejson = require('./data/planets.json')
var fs = require("fs");

//set the view engine to ejs
app.set('view engine', 'ejs')


var data = fs.readFileSync('./data/planets.json'); //reads file into var data
var jdata = JSON.parse(data);

var test = jdata['Mars'];
const c = 3*10**8;
var speed = 0;




app.get('/', function(req, res){
	//ejscon.getPlanets({})
	res.render('home');
});

app.get('/error', function(req, res){
	//ejscon.getPlanets({})
	res.render('error');
});

app.get('/list', (req,res) => {
	res.send(jdata);
})

app.get('/test', (req,res) => {
	res.send(test);
})

app.get('/planets/:planet', (req, res)  => { //allows us to put the id in the url instead of hard coding it
	var planet = req.params.planet; //this is an req and is native to the curly brackets
	

    //var result = jdata[planet];
   //var user = result[0];
	//var testing = user.Distance/2;  //working the pure numbers before printing as a string
	res.send(jdata[planet][0].Distance.toString() + ' Km');  //toLocaleString() formats the number with commas
});

app.get('/planets/:planet/speed/:speed',(req, res) => {
	var planet = req.params.planet;
	var speed = req.params.speed;
	var result = jdata[planet];
	var p = result[0]; //jdata[planet][0]
	var distNum = p.Distance*1000; //distance in meters
	var time = distNum/(speed*c);
	var formatTime;
	if(time < 3600) formatTime = (time/60).toFixed(2) + ' minutes';
	else if(time >= 3600 && time < 3600*24) formatTime = (time/3600).toFixed(2) + ' hours';
	else if(time >= 3600*24 && time < 3600*24*7) formatTime = (time/(3600*24)).toFixed(2) + ' days';
	else if(time >= 3600*24*7 && time < 3600*24*7*4) formatTime = (time/(3600*24*7)).toFixed(2) + ' weeks';
	else if(time >= 3600*24*7*4 && time < 3600*24*7*4*13) formatTime = (time/(3600*24*7*4)).toFixed(2) + ' months'; 
	else if(time >= 3600*24*7*4*13) formatTime = (time/(3600*24*7*4*13)).toFixed(2) + ' years';
	
	res.send({'Time to Destination:':formatTime})
});
const PORT = 3000;

app.listen(PORT, function (){
	console.log({serverportno:  PORT, date: new Date()});
});