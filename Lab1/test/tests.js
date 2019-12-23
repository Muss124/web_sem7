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
        var response = [400, {}, JSON.stringify({ "cod": "400", "message": "Nothing to geocode" })];
        this.srv.respondWith("GET", url, response);
        return getWeather("")
            .then(res => assert.equal(res["message"], "Nothing to geocode"))
            .catch(err => console.log(err));
    });

    it("Non existing city", function () {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=qwerty&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric";
        var response = [400, {}, JSON.stringify({ "cod": "404", "message": "city not found" })];
        this.srv.respondWith("GET", url, response);
        return getWeather("qwerty")
            .then(res => assert.equal(res["message"], "city not found"))
            .catch(err => assert.errorData);
    });
});


describe("Check form submit", function () {

    beforeEach(function () {
        this.srv = sinon.createFakeServer();
        this.srv.respondImmediately = true;
        this.getWeather = window.getWeather;
    });

    afterEach(function () {
        this.srv.restore();
        window.getWeather = this.getWeather
    });


    function newPromiseMock(val) {
        return function () {
            return {
                resolved: val,

                then: function (f) {
                    return {
                        resolved: f(this.resolved),
                        then: this.then
                    }
                }
            }
        };
    }

    it("Empty", function () {

        window.getWeather = newPromiseMock({
            "cod": "400", "message": "Nothing to geocode"
        });

        document.getElementById("_citysearch").value = "";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "Nothing to geocode");
        assert.equal(res, "");

    });


    it("Incorrect city name", function () {

        window.getWeather = newPromiseMock({ "cod": "404", "message": "city not found" });

        document.getElementById("_citysearch").value = "Moscowasdsadasd";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "city not found");
        assert.equal(res, "");
    });


    it("Correct city name", function () {

        window.getWeather = newPromiseMock({
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
        });

        document.getElementById("_citysearch").value = "Kiev";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").textContent;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "TEST CITY");
        assert.notEqual(res, "");
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
    });
    it("Error info weather", function () {
        render(errorData);
        var res =

            document.getElementById("WeatherInfo").outerHTML;
        var title = document.getElementById("City").outerHTML;
        assert.equal(errorTitle, title);
        assert.equal(errorRes, res);
    });
});
