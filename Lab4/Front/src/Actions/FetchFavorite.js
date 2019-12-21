import UpdateFavorite from './UpdateFavorite'
import ErrorLoad from './ErrorLoad'


export default function () {
    return function (dispatch) {
        fetch("http://localhost:3001/favourites")
            .then((res) => { return res; })
            .then((res) => res.json())
            .then((res) => dispatch(UpdateFavorite(res)))
            .catch((err) => dispatch(ErrorLoad(err)))
    }
}