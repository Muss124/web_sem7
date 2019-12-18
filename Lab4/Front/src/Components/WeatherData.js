import React from "react"
import store from "../store.js"

export class WeatherData extends React.Component {
	render() {
		var WeatherData = this.props.value;
		console.log("here");
		console.log(WeatherData)
		return (
			<div class="WeatherData">
				<div class="WeatherTop">
					<h2>{WeatherData.CityName}</h2>
					<img src={"http://openweathermap.org/img/wn/" + WeatherData.Icon + ".png"} alt=""></img>
					<h1>{WeatherData.Temperature} &#8451;</h1>
					<button type="submit" class="btn btn-secondary" onClick={() => {
						console.log("REMOVE");
						store.dispatch({ type: "FAVORITE_REMOVE", payload: WeatherData.CityName });
					}} >&#10006;</button>
				</div>
				<div class="WeatherMain">
					<div class="WeatherMainEl">
						<div class="WeatherParam">Weather</div>
						<div class="WeatherValue">{WeatherData.Weather}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Humidity (%)</div>
						<div class="WeatherValue">{WeatherData.Humidity}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Pressure (hPa)</div>
						<div class="WeatherValue">{WeatherData.Pressure}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Wind speed (meter/sec)</div>
						<div class="WeatherValue">{WeatherData.Wind}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Longitude </div>
						<div class="WeatherValue">{WeatherData.Longitude}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Latitude</div>
						<div class="WeatherValue">{WeatherData.Latitude}</div>
					</div>
				</div>
			</div>
		);
	}
}