import { transform } from '../Actions/weather'
import store from '../store'

// functions for refresh
export function refreshed(response, city) {
    return {
        type: "FAVORITE_DATA_REFRESHED",
        payload: {
            city: city,
            data: transform(response)
        }
    };
}
export function refresgErr(err, city) {
    return {
        type: "FAVORITE_DATA_UNREFRESHED",
        payload: {
            city: city,
            data: err
        }
    };
}

export function itemsFetchDataRef(data) {
    return function (dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric`)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch(refreshed(response, data)))
            .catch((err) => dispatch(refresgErr(err, data)))
    };
}

// functions for load
export function loaded(response, city) {
    return {
        type: "FAVORITE_DATA_RESOLVE",
        payload: {
            city: city,
            data: transform(response)
        }
    };
}
export function loadErr(err, city) {
    return {
        type: "FAVORITE_DATA_UNRESOLVE",
        payload: {
            city: city,
            data: err
        }
    };
}

export function itemsFetchData(data) {
    return function (dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric`)
            .then((response) => {
                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch(loaded(response, data)))
            .catch((err) => dispatch(loadErr(err, data)))

    };

}

// functions for load all favorite

export function fetchFavorite() {
    const Http = new XMLHttpRequest();
    const url = "http://localhost:3000/favourites";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(Http.responseText)
            console.log(data);
            store.dispatch({ type: "FETCH_FAVORITE", payload: data});
        }
    }
}
