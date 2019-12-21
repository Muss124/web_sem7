import AddFavorite from './AddFavorite'
import ErrorLoad from './ErrorLoad'
import { transform } from './weather'


export default function (city) {
    return function (dispatch) {
        fetch("http://localhost:3001/weather?city=" + city)
            .then((res) => { return res; })
            .then((res) => res.json())
            .then((res) => dispatch(AddFavorite(city, transform(res))))
            .catch((err) => dispatch(ErrorLoad(city, err)))
    }
}