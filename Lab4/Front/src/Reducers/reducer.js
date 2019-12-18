export function reducer(state, action) {
    var stateData = [...state];
    switch (action.type) {
        case "FAVORITE_ADD":
            stateData.push(action.payload);
            break;
        case "FAVORITE_DATA_RESOLVE":
            console.log(action.payload.city);
            if (action.payload.data["cod"] === "404") {
                console.log(action.payload);
                alert("City not founded");
                stateData = removeLoadingObject(action.payload, stateData);
            } else if (containsObject(action.payload, stateData)) {
                alert("City already added to Favorite");
                stateData = removeLoadingObject(action.payload, stateData);
            }
            else {
                stateData = changeObject(action.payload, stateData);

                const Http = new XMLHttpRequest();
                const url = "http://localhost:3000/favourites";
                const params = action.payload.data;
                Http.open("POST", url, true);
                Http.setRequestHeader('Content-Type', 'application/json');
                Http.send(params);
                Http.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                    }
                }
            }
            break;
        /*  WHEN USED? O_o
            case "FAVORITE_DATA_ERROR":
                alert(action.payload.data);
                stateData = removeObject(action.payload, stateData);
                break;
        */
        case "FAVORITE_REMOVE":
            stateData = stateData.filter(city => city.city !== action.payload);

            const Http = new XMLHttpRequest();
            const url = "http://localhost:3000/favourites?city=" + action.payload;
            Http.open("DELETE", url);
            Http.send();
            Http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                }
            }
            break;
        default:
            break;
    }
    return stateData;
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.data["CityName"] && list[i].loading === false) {
            return true;
        }
    }
    return false;
}
/*
function removeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city) {
            list.splice(i, 1);
        }
    }
    return list;
}
*/
function removeLoadingObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city && list[i].loading === true) {
            list.splice(i, 1);
        }
    }
    return list;
}
function changeObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.city) {
            obj.city = obj.data["CityName"];
            list[i] = obj;
        }
    }
    return list;
}