export function transform(input) {
    console.log(input.weather);
    return {
        "CityName": input.name,
        "Temperature" : input.main.temp,
        "Weather": input.weather[0].description,
        "Humidity": input.main.humidity,
        "Pressure": input.main.pressure,
        "Wind": input.wind.speed,
        "Longitude": input.coord.lon,
        "Latitude": input.coord.lat,
        "Icon": input.weather[0].icon,
        "Cod": input.cod
    }
}