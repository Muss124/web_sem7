var assert = chai.assert;

describe("Check getweather()", function () {
    var server = sinon.createFakeServer();

    var url = "http://api.openweathermap.org/data/2.5/weather?q=&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
    var response = [400, {}, JSON.stringify({ "cod": "400", "message": "Nothing to geocode" })];;
    server.respondWith(url, response);

    it("Empty", function () {
        getWeather("").then(res => assert.equal(res["message"], "Nothing to geocode"))
    });


    var url = "http://api.openweathermap.org/data/2.5/weather?q=qwerty&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
    var response = [400, {}, JSON.stringify({ "cod": "404", "message": "city not found" })];
    server.respondWith(url, response);

    it("Non existing city", function () {
        getWeather("qwerty").then(res => assert.equal(res["message"], "Nothing to geocode"))
    });
});
describe("Check render", function () {
    var testData = {
        "weather": [
            { description: "Normal weather" }
        ],
        "cod": 200,
        "name": "TEST CITY",
        "message": "",
        "main": {
            "temp": 45,
            "humidity": 100,
            "pressure": 1000,
        },
        "wind": {
            "speed": 8
        }
    };
    var errorData = {
        "cod": 404,
        "message": "city not found"
    };
    var testRes = '<div id="WeatherInfo" class="Weather"><li>weather - Normal weather</li><li>temperature (Celsius) - 45</li><li>humidity (%) - 100</li><li>pressure (hPa) - 1000</li><li>wind speed (meter/sec) - 8</li></div>';
    var errorRes = '<div id="WeatherInfo" class="Weather"></div>';
    var testTitle = '<div id="City" class="City">TEST CITY</div>';
    var errorTitle = '<div id="City" class="City">city not found</div>';
    it("City info weather", function () {
        render(testData);
        var res = document.getElementById("WeatherInfo").outerHTML;
        var title = document.getElementById("City").outerHTML;
        assert.equal(testTitle, title);
        assert.equal(testRes, res);
    })
    it("Error info weather", function () {
        render(errorData);
        var res = document.getElementById("WeatherInfo").outerHTML;
        var title = document.getElementById("City").outerHTML;
        assert.equal(errorTitle, title);
        assert.equal(errorRes, res);
    });
});
describe("Check form submit", function () {
    var server = sinon.createFakeServer();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
    var response = [400, {}, JSON.stringify({ "cod": "400", "message": "Nothing to geocode" })];
    server.respondWith(url, response);

    it("Empty", function () {
        document.getElementById("_citysearch").value = "";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "city not found");
        assert.equal(res, "");
    });

    var url = "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
    var response = [200, {}, JSON.stringify({"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":1.78,"feels_like":-1.33,"temp_min":1,"temp_max":2.78,"pressure":1013,"humidity":100},"visibility":4000,"wind":{"speed":2,"deg":190},"clouds":{"all":90},"dt":1576653302,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1576648520,"sunset":1576673789},"timezone":10800,"id":524901,"name":"Moscow","cod":200})];
    server.respondWith(url, response);


    it("Correct city name", function () {
        document.getElementById("_citysearch").value = "Moscow";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "Moscow");
        assert.notEqual(res, "");
    });

    var url = "http://api.openweathermap.org/data/2.5/weather?q=Moscowasdsadasd&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
    var response = [400, {}, JSON.stringify({ "cod": "404", "message": "city not found" })];
    server.respondWith(url, response);    

    it("Incorrect city name", function () {
        document.getElementById("_citysearch").value = "Moscowasdsadasd";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "city not found");
        assert.equal(res, "");
    });
});