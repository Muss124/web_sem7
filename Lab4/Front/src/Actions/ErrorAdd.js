export default function(city, err) {
    return {
        type: "ERROR_ADD",
        city: city,
        err: err
    }
}