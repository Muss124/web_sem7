export function reducer(state, action) {
    var stateData = [...state];
    switch (action.type) {


        case "FAVORITE_ADD":
            stateData.push(action.payload);
            break;
        case "FAVORITE_DATA_RESOLVE":
            console.log(action.payload.city);
            if (action.payload.data.cod === "404") {
                console.log(action.payload);
                alert(action.payload.data["message"]);
                stateData = removeLoadingObject(action.payload, stateData);
            } else if (containsObject(action.payload, stateData)) {
                alert("City already added to Favorite");
                stateData = removeLoadingObject(action.payload, stateData);
            }
            else {
                stateData = changeObject(action.payload, stateData);
                window.localStorage.setItem("favorite", JSON.stringify(stateData));
            }
            break;
        case "FAVORITE_DATA_UNRESOLVE":
            alert("Load error");
            stateData = stateData.filter(city => city.city !== action.payload.city);
            break;
        case "FAVORITE_DATA_ERROR":
            alert(action.payload.data);
            stateData = removeObject(action.payload, stateData);
            break;
        case "FAVORITE_REMOVE":
            stateData = stateData.filter(city => city.city !== action.payload);
            window.localStorage.setItem("favorite", JSON.stringify(stateData));
            break;
        case "FAVORITE_DATA_REFRESHED":
            changeObject(action.payload, stateData);
            window.localStorage.setItem("favorite", JSON.stringify(stateData));
            break;
        case "FAVORITE_DATA_UNREFRESHED":
            alert("City " + action.payload.city + " wasn't updated due to problem with network")
            break;
        default:
            break;
    }

    return stateData;
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        console.log(list[i].city === obj.city )
        console.log(Object.keys(list[i].data).length)
        if (list[i].city === obj.city && Object.keys(list[i].data).length !== 0) {
            return true;
        }
    }
    return false;
}
function removeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city) {
            list.splice(i, 1);
        }
    }
    return list;
}
function removeLoadingObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city && Object.keys(list[i].data).length === 0) {
            list.splice(i, 1);
        }
    }
    return list;
}
function changeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city) {
            obj.city = obj.data.CityName;
            list[i] = obj;
        }
    }
    return list;
}