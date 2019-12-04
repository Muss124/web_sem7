import { createStore, applyMiddleware } from "redux";
import { reducer } from "./Reducers/reducer.js";
import thunk from "redux-thunk";
//import promise from "redux-promise-middleware";

const myMiddle = (store) => (next) => (action) => {
    console.log("Logged action", action);
    next(action);
};

export default createStore(
    reducer,
    JSON.parse(window.localStorage.getItem('favorite')),
    applyMiddleware(myMiddle, thunk)
);

/*
new Promise((resolve, reject) => {
            var request = new XMLHttpRequest()
            request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='.concat(city, "&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric"), true)
            request.onload = function () {
                var data = JSON.parse(this.response)
                resolve(data)
            }
            request.onerror = () => reject("Load error")
            request.send()
        })
*/