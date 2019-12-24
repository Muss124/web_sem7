export default function (city, res) {
    return {
        type: "ERROR_SERVER_ADD",
        payload: city,
        res: res
    }
}