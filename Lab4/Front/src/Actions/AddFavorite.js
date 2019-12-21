export default function (city, data) {
    return {
        type: "FAVORITE_ADD_OK",
        city: city,
        payload: data
    }
}