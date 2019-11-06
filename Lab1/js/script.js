function render(data) {
    var htmlWeather = document.getElementById("WeatherInfo")
    var htmlCity = document.getElementById("City")
    if (data['cod'] === 200) {
        //console.log("yes")
        htmlCity.textContent = data["name"]
        var template = "{{~it.weather :value:index}}<li>{{=value.parametr}} - {{=value.value}}</li>{{~}}"
        var json = {
            "weather": [
                { "parametr": "weather", "value": data["weather"][0]["description"] },
                { "parametr": "temperature (Celsius)", "value": data["main"]["temp"] },
                { "parametr": "humidity (%)", "value": data["main"]["humidity"] },
                { "parametr": "pressure (hPa)", "value": data["main"]["pressure"] },
                { "parametr": "wind speed (meter/sec)", "value": data["wind"]["speed"] }
            ]
        }
        var tempFn = doT.template(template)
        htmlWeather.innerHTML = tempFn(json)
    } else {
        //console.log("no")
        htmlCity.textContent = data["message"]
        htmlWeather.innerHTML = ""
    }
}

function getweather(city, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='.concat(city, "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric"), true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        //console.log(data)
        callback(data)
    }
    request.send()
}

function formSubmit(event) {
    event.preventDefault()
    var city = document.getElementById("_citysearch").value;
    //console.log(city)
    getweather(city, render)    
}