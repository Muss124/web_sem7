import AddFavorite from './AddFavorite'
import ErrorAdd from './ErrorAdd'

export default function (city, data) {
    return function (dispatch) {
        fetch("http://localhost:3001/favourites", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            //.then(res => res.ok ? dispatch(AddFavorite(city, data)) : dispatch(ErrorServerAdd(city, res)))
            .then(res => { if (res.ok) { dispatch(AddFavorite(city, data)) } else { throw Error(res) } })
            .catch(err => dispatch(ErrorAdd(city, err)))
    }
}