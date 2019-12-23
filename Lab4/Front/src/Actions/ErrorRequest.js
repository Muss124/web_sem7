export default function (city, res) {
    return {
        type: "ERROR_REQUEST",
        payload: city,
        data: res
    };
}