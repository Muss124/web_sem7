import ErrorLoad from './ErrorLoad'
import { transform } from './weather'
import ServerAddFavorite from './ServerAddFavorite'


export default function (city) {
    return function (dispatch) {
        fetch("http://localhost:3001/weather?city=" + city)
            //.then(res => res.ok ? res.json() : dispatch(ErrorRequest(city, res)))
            .then(res => { if (res.ok) { return res.json() } else { throw Error(res) } })
            .then(res => dispatch(ServerAddFavorite(city, transform(res))))
            .catch(err => dispatch(ErrorLoad(city, err)))
    }
}