import { json } from "body-parser";

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
        case "FAVORITE_ADD":
            stateData.push(action.payload);
            break;
        case "FAVORITE_ADD_OK":
            //тут вся обработка реза, сюда и с 404 приходит
            if (action.payload.cod === "404") {
                alert("City " + action.city + " wasn't founded");
            } else if (containsObject(action.payload, stateData)) {
                alert("City already added to Favorite");
                stateData = removeLoadingObject(action.city, stateData);
            } else {
                stateData = changeObject(action.payload, stateData);
                fetch("http://localhost:3001/favourites", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.payload)
                })
            }
            break;
        case "":

            break;
        case "1":

            break;
        case "2":

            break;
        case "3":

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
        if (list[i].CityName === obj.CityName && Object.keys(list[i]).length !== 1) {
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
            obj.city = obj.data.CityName;
            list[i] = obj;
        }
    }
    return list;
}