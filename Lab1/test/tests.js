var assert = chai.assert;

describe("Check getweather()", function () {
    before(function () {
        this.srv = sinon.createFakeServer();
        this.srv.respondImmediately = true;
    });

    after(function () {
        this.srv.restore();
    });



    it("Empty", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
        var response = [400, {}, JSON.stringify({ "cod": "400", "message": "Nothing to geocode" })];;
        this.srv.respondWith("GET", url, response);
        getWeather("").then(res => assert.equal(res["message"], "Nothing to geocode"))
    });

    it("Non existing city", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=qwerty&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
        var response = [400, {}, JSON.stringify({ "cod": "404", "message": "city not found" })];
        this.srv.respondWith("GET", url, response);
        getWeather("qwerty").then(res => assert.equal(res["message"], "Nothing to geocode"))
    });
});



describe("Check form submit", function () {

    before(function () {
        this.srv = sinon.createFakeServer();
        this.srv.respondImmediately = true;
    });

    after(function () {
        this.srv.restore();
    });


    it("Empty", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
        var response = [404, {}, JSON.stringify({ "cod": "400", "message": "Nothing to geocode" })];
        this.srv.respondWith("GET", url, response);
        document.getElementById("_citysearch").value = "";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        setTimeout(() => {
            assert.equal(Title, "city not found");
            assert.equal(res, "");
        }, 3000);
    });


    it("Incorrect city name", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=Moscowasdsadasd&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
        var response = [404, {}, JSON.stringify({ "cod": "404", "message": "city not found!!!!!" })];
        this.srv.respondWith("GET", url, response);
        document.getElementById("_citysearch").value = "Moscowasdsadasd";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        setTimeout(() => {
            assert.equal(Title, "city not found");
            assert.equal(res, "");
        }, 3000);
    });


    it("Correct city name", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=Kiev&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
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
        var response = [200, {}, JSON.stringify(testData)];
        this.srv.respondWith("GET", url, response);
        document.getElementById("_citysearch").value = "Kiev";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").textContent;
        var res = document.getElementById("WeatherInfo").innerHTML;
        setTimeout(() => {
            assert.equal(Title, "TEST CITY");
            assert.notEqual(res, "");
        }, 3000);
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