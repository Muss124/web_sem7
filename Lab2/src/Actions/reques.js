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
export function loadErr(response, city) {
    return {
        type: "FAVORITE_DATA_RESOLVE",
        payload: {
            loading: false,
            city: city.city,
            data: response
        }
    };
}

export function test() {
    return {
        type: "test"
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
    };

}
/*
.then((response) => {
                return response;
            })


export function fetchCityData(data) {
    return function (dispatch) {
        //dispatch()
        return fetch('http://api.openweathermap.org/data/2.5/weather?q=' + data.city + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                dispatch(
                    {
                        type: "FAVORITE_DATA_RESOLVE",
                        payload: {
                            loading: false,
                            city: data.city,
                            data: json
                        }
                    }
                )
            )
    }
}


export function getCityData(data) {
    console.log("send");
    console.log(data);
    return function (dispatch) {
        return fetch('http://api.openweathermap.org/data/2.5/weather?q=' + data.city + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric').then(
            sauce => dispatch({
                type: "FAVORITE_DATA_RESOLVE",
                payload: {
                    loading: false,
                    city: data.city,
                    data: sauce.json()
                }
            }),
            error => dispatch({
                type: "FAVORITE_DATA_ERROR",
                payload: {
                    loading: false,
                    city: data.city,
                    data: error
                }
            })
        )
    }
    /*
    return {
        type: "FAVORITE_DATA",
        payload: {
            ...data,
            data: new Promise((resolve, reject) => {
                var request = new XMLHttpRequest()
                request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + name + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric', true)
                request.onload = function () {
                    var data = JSON.parse(this.response)
                    resolve(data)
                }
                request.onerror = () => reject("Load error")
                request.send(),

            }
    })
    }
    */
//}
