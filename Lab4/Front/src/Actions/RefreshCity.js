import { transform } from './weather'
import ErrorRefresh from './ErrorRefresh'
import ServerRefreshCity from './ServerRefreshCity'



export default function (city) {
    return function (dispatch) {
        fetch("http://localhost:3001/weather?city=" + city)
            .then(res => { if (res.ok) { return res.json() } else { throw Error(res) } })
            .then(res => dispatch(ServerRefreshCity(transform(res))))
            .catch(err => dispatch(ErrorRefresh(city, err)))
    }
}