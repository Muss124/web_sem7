var express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
var app = express();
const port = 3001;


app.use(cors());
app.use(express.static(__dirname + '/main'));
app.use(express.json());

// db config 
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "Lab4"
});

// db connect 
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
/*
app.get('/asdasdasdsad', (req, res) => {
	//res.send('An alligator approaches!');
	var sql = "SELECT * FROM `favorite`";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result[0].CityName);
		res.send('An alligator approaches!');
	});
});
*/

// main page
app.get('/index.html', (req, res) => {
	console.log(req.query);
	res.sendFile(__dirname + '/Front/index.html');
});



// get weather by city name (/weather?city=Moscow)
app.get('/weather', (req, res) => {
	var city = req.query.city;
	console.log("get weather by city name - " + city);
	var que = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
	fetch(que)
		.then(response => response.json())
		.then(response => {
			res.status(response.cod).send(response)
		})
		.catch(err => console.log("Fetch error " + err));
});



// get weather by coordinates (/weather/coordinates?lat=123&long=456)
app.get('/weather/coordinates', (req, res) => {
	var lat = req.query.lat;
	var long = req.query.long;
	console.log("get weather by coordinates - " + lat + " " + long);
	var que = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
	fetch(que)
		.then(response => response.json())
		.then(data => {
			res.status(data.cod).send(data)
		})
		.catch(err => console.log("Fetch error " + err));
});



//get list of favourite cities 
app.get('/favourites', (req, res) => {
	console.log("get favorite");
	var sql = "SELECT * FROM `favorite`";
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		//console.log(result[0].CityName);
		res.status(200).send(result);
	});
});

// delete city from favourite  
app.delete('/favourites', (req, res) => {
	var city = req.query.city;
	console.log("delete favorite - " + city);
	var sql = "DELETE FROM `favorite` WHERE `CityName` = " + '"' + city + '"';
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		console.log(result);
		res.sendStatus(200);
	});
});
// add city to favourite
app.post('/favourites', (req, res) => {
	var data = req.body;
	console.log("Adding city to favorite - " + data.CityName + " with input data:");
	console.log(data);
	console.log("_________");
	var sql = "SELECT * FROM `favorite` WHERE `CityName` = " + '"' + data.CityName + '"';
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		console.log(result);
		console.log("_________");
		if (result.length === 0) {
			sql = "INSERT INTO `favorite` (`CityName`, `Temperature`, `Weather`, `Humidity`, `Pressure`, `Wind`, `Longitude`, `Latitude`, `Icon`, `Cod`) VALUES ('" +
				data.CityName + "', '" +
				data.Temperature + "', '" +
				data.Weather + "', " +
				data.Humidity + ", " +
				data.Pressure + ", " +
				data.Wind + ", " +
				data.Longitude + ", " +
				data.Latitude + ", '" +
				data.Icon + "', " +
				data.Cod + "); ";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) { res.sendStatus(500); throw err; }
				console.log(result);
				console.log("_________");
				res.sendStatus(200);
			});
		}
		else {
			res.status(500).send("City alredy added");
		}
	});
});

app.post('/update', (req, res) => {
	var data = req.body;
	console.log("Updateting info about " + data.CityName);
	console.log(data);
	var sql = "UPDATE `favorite` SET " +
		"`Temperature`=" + data.Temperature +
		', `Weather`="' + data.Weather +
		'", `Humidity`=' + data.Humidity +
		", `Pressure`=" + data.Pressure +
		", `Wind`=" + data.Wind +
		', `Icon`="' + data.Icon +
		'", `Cod`=' + data.Cod +
		' WHERE `CityName`="' + data.CityName + '"';
	console.log(sql);
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		console.log(result);
		console.log("_________");
		res.sendStatus(200);
	});
});

// listening on port 
app.listen(port, function () {
	console.log("App listening on port 3001!");
	console.log(__dirname);
});
