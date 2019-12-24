import React from "react"
import store from "../../../store"
import "../css/WeatherData.css"
import ServerDeleteCity from '../../../Actions/ServerDeleteCity'

export class WeatherData extends React.Component {
	render() {
		var WeatherData = this.props.value;
		//console.log("here");
		//console.log(WeatherData);
		//console.log(this.props.isMain);
		if (this.props.isMain) {
			return (
				<div className="WeatherData">
					<div className="WeatherTop">
						<h2>{WeatherData.CityName}</h2>
						<img src={"http://openweathermap.org/img/wn/" + WeatherData.Icon + ".png"} alt=""></img>
						<h1>{WeatherData.Temperature} &#8451;</h1>
					</div>
					<div className="WeatherMain">
						<div className="WeatherMainEl">
							<div className="WeatherParam">Weather</div>
							<div className="WeatherValue">{WeatherData.Weather}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Humidity (%)</div>
							<div className="WeatherValue">{WeatherData.Humidity}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Pressure (hPa)</div>
							<div className="WeatherValue">{WeatherData.Pressure}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Wind speed (meter/sec)</div>
							<div className="WeatherValue">{WeatherData.Wind}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Longitude </div>
							<div className="WeatherValue">{WeatherData.Longitude}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Latitude</div>
							<div className="WeatherValue">{WeatherData.Latitude}</div>
						</div>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="WeatherData">
					<div className="WeatherTop">
						<h2>{WeatherData.CityName}</h2>
						<img src={"http://openweathermap.org/img/wn/" + WeatherData.Icon + ".png"} alt=""></img>
						<h1>{WeatherData.Temperature} &#8451;</h1>
						<button type="submit" className="btn btn-secondary" onClick={() => {
							console.log("REMOVE");
							//store.dispatch({ type: "FAVORITE_REMOVE", payload: WeatherData.CityName });
							store.dispatch(ServerDeleteCity(WeatherData.CityName));
						}} >&#10006;</button>
					</div>
					<div className="WeatherMain">
						<div className="WeatherMainEl">
							<div className="WeatherParam">Weather</div>
							<div className="WeatherValue">{WeatherData.Weather}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Humidity (%)</div>
							<div className="WeatherValue">{WeatherData.Humidity}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Pressure (hPa)</div>
							<div className="WeatherValue">{WeatherData.Pressure}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Wind speed (meter/sec)</div>
							<div className="WeatherValue">{WeatherData.Wind}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Longitude </div>
							<div className="WeatherValue">{WeatherData.Longitude}</div>
						</div>
						<div className="WeatherMainEl">
							<div className="WeatherParam">Latitude</div>
							<div className="WeatherValue">{WeatherData.Latitude}</div>
						</div>
					</div>
				</div>
			);
		}

	}
}