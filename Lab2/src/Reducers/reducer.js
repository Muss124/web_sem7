export function reducer(state, action) {
    var stateData = [...state];
    switch (action.type) {
		/*
		case "FAVORITE_LOAD":
			if (JSON.parse(window.localStorage.getItem('favorite')) === null) {
				stateData = [];
			}
			else {
				stateData = JSON.parse(window.localStorage.getItem('favorite'));
			}
			break;
			
        case "FAVORITE_REMOVE":
            stateData = stateData.filter(city => city.city !== action.payload);
            console.log(stateData);
            break;
        case "FAVORITE_ADD_BEF":
            if (!containsObject(action.payload, stateData)) {
                stateData.push(action.payload);
            }
            else {
                alert(action.payload.city + " is already added to favorite!")
            }
            break;
        case "FAVORITE_ADD_ER":
            stateData = removeObject(action.payload, stateData);
            break;
        case "FAVORITE_ADD_OK":
			
			if (containsObject({ city: action.payload.city }, stateData)) {
				removeObject(action.payload, stateData);
				alert(action.payload.city + " is already added to favorite!")
			}
			else {
		
			}
			
            // Запилить проверку для случаев с разным написанием kiev KIev 
            // Видимо, нужна другая функция для сравнения с загруженными	
            stateData = changeObject(action.payload, stateData);
            break;
        */

        case "FAVORITE_ADD":
            stateData.push(action.payload);
            break;
        case "FAVORITE_DATA_RESOLVE":
            if (containsObject(action.payload, stateData)) {
                alert("City already added to Favorite");
                stateData = removeLoadingObject(action.payload, stateData);
            }
            else {
                stateData = changeObject(action.payload, stateData);
            }
            break;
        case "FAVORITE_DATA_ERROR":
            alert(action.payload.data);
            stateData = removeObject(action.payload, stateData);
            break;
        case "FAVORITE_REMOVE":
            stateData = stateData.filter(city => city.city !== action.payload);
            break;
        default:
            break;
    }
    window.localStorage.setItem("favorite", JSON.stringify(stateData));
    return stateData;
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].city === obj.data["name"] && list[i].loading === false) {
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
            obj.city = obj.data["name"];
            list[i] = obj;
        }
    }
    return list;
}