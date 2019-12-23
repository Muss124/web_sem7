var express = require('express');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
var app = express();
const port = 3001;


app.use(cors());
app.use(express.static(__dirname + '/main'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

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
	var que = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
	fetch(que)
		.then(response => response.json())
		.then(res => console.log(res))
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => console.log("Fetch error " + err));
});



// get weather by coordinates (/weather/coordinates?lat=123&long=456)
app.get('/weather/coordinates', (req, res) => {
	var lat = req.query.lat;
	var long = req.query.long;
	console.log("get weather by coordinates - " + lat + " " + long);
	var que = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
	fetch(que)
		.then(response => response.json())
		.then(data => {
			res.send(data)
		})
		.catch(err => console.log("Fetch error " + err));
});



//get list of favourite cities 
app.get('/favourites', (req, res) => {
	console.log("get favorite");
	var sql = "SELECT * FROM `favorite`";
	con.query(sql, function (err, result) {
		if (err) throw err;
		//console.log(result[0].CityName);
		res.send(result);
	});
});

// delete city from favourite  
app.delete('/favourites', (req, res) => {
	console.log("delete favorite");
	var city = req.query.city;
	var sql = "DELETE FROM `favorite` WHERE `CityName` = " + '"' + city + '"';
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		console.log(result);
		res.sendStatus(200);
	});
});
// add city to favourite
app.post('/favourites', (req, res) => {
	console.log(req.body);
	var data = req.body;
	var sql = "SELECT * FROM `favorite` WHERE `CityName` = " + '"' + data.name + '"';
	con.query(sql, function (err, result) {
		if (err) { res.sendStatus(500); throw err; }
		console.log(result);
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
				res.sendStatus(200);
			});
		}
		else
		{
			res.send("City alredy added");
		}
	});
});



// listening on port 
app.listen(port, function () {
	console.log("App listening on port 3001!");
	console.log(__dirname);
});

/*
{
            "loading": false,
            "city": "Kiev",
            "data": {
                "coord": { "lon": 30.52, "lat": 50.43 },
                "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }],
                "base": "stations",
                "main": { "temp": 6.29, "feels_like": 2.93, "temp_min": 4, "temp_max": 7.78, "pressure": 1017, "humidity": 87 },
                "visibility": 10000,
                "wind": { "speed": 3, "deg": 230 },
                "clouds": { "all": 30 },
                "dt": 1576604944,
                "sys": { "type": 1, "id": 8903, "country": "UA", "sunrise": 1576561989, "sunset": 1576590872 },
                "timezone": 7200,
                "id": 703448,
                "name": "Kiev",
                "cod": 200
            }
        }
*/