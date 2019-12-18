import { createStore, applyMiddleware } from "redux";
import { reducer } from "./Reducers/reducer.js";
import thunk from "redux-thunk";

const myMiddle = (store) => (next) => (action) => {
    console.log("Logged action", action);
    next(action);
};

function getdata() {
    const Http = new XMLHttpRequest();
    const url = "http://localhost:3000/favourites";
    var data = [];

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = Http.responseText
            return data;
        }
    }
}

export default createStore(
    reducer,
    [],
    applyMiddleware(myMiddle, thunk)
);