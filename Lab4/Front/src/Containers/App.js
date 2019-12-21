import React from 'react';
import { Provider } from 'react-redux';
import store from "../store";
import { MainWeather } from "../Components/MainWeather/js/MainWeather";
import Favorite from "../Components/Favorite/js/Favorite"


export const App = (props) => {
  return (
    <div>
      <div className="app">
        <h2>Weather here</h2>
        <MainWeather name="MainWeather" />
      </div>
      <Provider store={store}>
        <Favorite name="Favorite" />
      </Provider>
    </div>
  );
}
