export default function (data, err) {
    return {
        type: "ERROR_LOAD",
        payload: data,
        err : err
    };
}