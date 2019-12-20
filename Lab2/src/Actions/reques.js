import { transform } from '../Actions/weather'

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
