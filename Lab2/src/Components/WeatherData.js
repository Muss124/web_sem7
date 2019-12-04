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
					<h2>{WeatherData["name"]}</h2>
					<img src={"http://openweathermap.org/img/wn/" + WeatherData["weather"][0]["icon"] + ".png"} alt=""></img>
					<h1>{WeatherData["main"]["temp"]} &#8451;</h1>
					<button type="submit" class="btn btn-secondary" onClick={() => {
						console.log("REMOVE");
						store.dispatch({ type: "FAVORITE_REMOVE", payload: WeatherData["name"] });
					}} >&#10006;</button>
				</div>
				<div class="WeatherMain">
					<div class="WeatherMainEl">
						<div class="WeatherParam">Weather</div>
						<div class="WeatherValue">{WeatherData["weather"][0]["description"]}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Humidity (%)</div>
						<div class="WeatherValue">{WeatherData["main"]["humidity"]}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Pressure (hPa)</div>
						<div class="WeatherValue">{WeatherData["main"]["pressure"]}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Wind speed (meter/sec)</div>
						<div class="WeatherValue">{WeatherData["wind"]["speed"]}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Longitude </div>
						<div class="WeatherValue">{WeatherData["coord"]["lon"]}</div>
					</div>
					<div class="WeatherMainEl">
						<div class="WeatherParam">Latitude</div>
						<div class="WeatherValue">{WeatherData["coord"]["lat"]}</div>
					</div>
				</div>
			</div>
		);
	}
}