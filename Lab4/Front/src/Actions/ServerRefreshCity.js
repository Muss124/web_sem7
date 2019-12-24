import FavoriteRefresh from "./FavoriteRefresh"
import ErrorRefresh from './ErrorRefresh'

export default function(data) {
    return function (dispatch) {
        fetch("http://localhost:3001/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => { if (res.ok) { dispatch(FavoriteRefresh(data)) } else { throw Error(res) } })
            .catch(err => dispatch(ErrorRefresh(data.CityName, err)))
    }
}