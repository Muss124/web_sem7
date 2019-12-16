var assert = chai.assert;
describe("Check getweather()", function () {
    it("Empty", function () {
        getWeather("").then(res => assert.equal(res["message"], "Nothing to geocode"))
    });
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
    it("Empty", function () {
        document.getElementById("_citysearch").value = "";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "city not found");
        assert.equal(res, "");
    });
    it("Correct city name", function () {
        document.getElementById("_citysearch").value = "Moscow";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        // somehow to wait until render();
        //assert.equal(Title, "Moscow");
        //assert.notEqual(res, "");
        setTimeout(() => {
            assert.equal(Title, "Moscow");
            assert.notEqual(res, "");
        }, 1000);
    });
    it("Incorrect city name", function () {
        document.getElementById("_citysearch").value = "Moscowasdsadasd";
        document.getElementById("searchbutton").click();
        var Title = document.getElementById("City").innerHTML;
        var res = document.getElementById("WeatherInfo").innerHTML;
        assert.equal(Title, "city not found");
        assert.equal(res, "");
    });
});