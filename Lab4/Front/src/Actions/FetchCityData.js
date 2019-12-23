import AddFavorite from './AddFavorite'
import ErrorLoad from './ErrorLoad'
import { transform } from './weather'
import ErrorRequest from './ErrorRequest'


export default function (city) {
    return function (dispatch) {
        fetch("http://localhost:3001/weather?city=" + city)
            .then(res => res.ok ? res.json() : dispatch(ErrorRequest(city, res)))
            .then(res => dispatch(AddFavorite(city, transform(res))))
            .catch(err => dispatch(ErrorLoad(city, err)))
    }
}