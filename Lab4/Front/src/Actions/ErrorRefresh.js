export default function (city, err) {
    return {
        type: "ERROR_REFRESH",
        city: city,
        err: err
    }
}