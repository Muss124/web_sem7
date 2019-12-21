export default function (latitude, longitude) {
    return fetch("http://localhost:3000/weather/coordinates?lat=" + latitude + "&long=" + longitude, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(() => DeleteCity(name));
}