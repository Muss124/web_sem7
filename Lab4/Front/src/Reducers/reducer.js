export function reducer(state, action) {
    var stateData = [...state];
    switch (action.type) {

        case "FAVORITE_UPDATE":
            stateData = action.payload;
            break;
        case "ERROR_LOAD":
            alert("Load error");
            stateData = removeLoadingObject(action.payload, stateData);
            break;
        case "ERROR_DELETE":
            alert("Delete error");
            console.log(action.err);
            break;
        case "FAVORITE_ADD":
            stateData.push(action.payload);
            break;
        case "FAVORITE_DELETE":
            stateData = stateData.filter(city => city.CityName !== action.payload);
            break;
        case "FAVORITE_ADD_OK":
            console.log("FAVORITE_ADD_OK");
            stateData = changeObject(action.payload, stateData);
            break;
        case "ERROR_SERVER_ADD":
            alert("Adding to db error");
            stateData = removeLoadingObject(action.payload, stateData);
            break;
        case "ERROR_REFRESH":
            alert("Error while refreshing " + action.city + " info")
            console.log(action.err);
            break;
        case "FAVORITE_REFRESH":
            changeObject(action.data, stateData)
            break;
        case "ERROR_ADD":
            alert("Adding " + action.city + " error");
            console.log(action.err);
            stateData = removeLoadingObject(action.city, stateData);
            break;
        default:
            break;
    }

    return stateData;
}

/*
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].CityName === obj.CityName && Object.keys(list[i]).length !== 1) {
            return true;
        }
    }
    return false;
}

function removeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].CityName === obj && Object.keys(list[i]).length !== 1) {
            list.splice(i, 1);
        }
    }
    return list;
}
*/
function removeLoadingObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].CityName === obj && Object.keys(list[i]).length === 1) {
            list.splice(i, 1);
        }
    }
    return list;
}
function changeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].CityName === obj.CityName) {
            obj.city = obj.CityName;
            list[i] = obj;
        }
    }
    return list;
}