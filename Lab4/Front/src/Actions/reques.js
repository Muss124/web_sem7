import { transform } from "../Actions/weather.js"
export function loaded(response, city) {
    return {
        type: "FAVORITE_DATA_RESOLVE",
        payload: {
            loading: false,
            city: city,
            data: response
        }
    };
}
export function itemsFetchData(city) {
    /*
    return function (dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric`)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch(loaded(response, city)))
    };
    */
    const Http = new XMLHttpRequest();
    const url = "http://localhost:3000/weather?city=" + city;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(Http.responseText)
            //console.log(data);
            //console.log(transform(data));
            return function (dispatch) {
                dispatch(loaded(transform(data), city))
            };
        }
    }

}