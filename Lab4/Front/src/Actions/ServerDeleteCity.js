import DeleteCity from './DeleteCity'
import ErrorDelete from './ErrorDelete'

export default function (city) {
    return function (dispatch) {
        fetch("http://localhost:3001/favourites?city=" + city, {
            method: "DELETE"
        })
            .then(res => { if (res.ok) { dispatch(DeleteCity(city)) } else { throw Error(res) } })
            .catch(err => dispatch(ErrorDelete(err)))
    }
}