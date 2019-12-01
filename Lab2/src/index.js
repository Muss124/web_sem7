import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// Redux part
import { createStore } from 'redux';

function favoriteStore(state = [], action) {
	var stateData = state;
	if (action.type === "FAVORITE_LOAD") {
		var localData = JSON.parse(window.localStorage.getItem('favorite'));
		if (localData === null) {
			return [];
		}
		return localData;
	}
	if (action.type === "FAVORITE_ADD") {
		if (!containsObject(action.payload, stateData)) {
			stateData.push(action.payload);
		}
		else {
			alert(action.payload["name"] + " is already added to favorite!")
		}
		window.localStorage.setItem("favorite", JSON.stringify(stateData));
		return stateData;
	}
	if (action.type === "FAVORITE_REMOVE") {
		return stateData.filter(city => city["name"] !== action.payload);
	}
}
const store = createStore(favoriteStore)
store.subscribe(() => {
	console.log('subscribe', store.getState())
})


// React part
class MainWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			FavoriteLoading: Array(0).fill(false)
		}
	}
	componentDidMount() {
		this.checkGeo();
	}
	checkGeo() {
		navigator.geolocation.getCurrentPosition(this.goodWeather, this.badWeather)
	}
	render() {
		if (this.state.loading) {
			return (
				<div class="spinner-border text-danger" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			);
		}
		if (this.state.success) {
			var value = this.state.data;
			console.log(value);
			return (
				<div>
					<button type="button" class="btn btn-warning" onClick={() => { this.setState({ loading: true }); this.checkGeo() }}>Refresh geolocation</button>
					<div class="TopCityWeather">
						<WeatherData value={value} />
					</div>
				</div>
			);
		}
		if (!this.state.access)
			return (<div></div>);

	}
	goodWeather = (position) => {
		this.setState({ loading: true, access: true });
		this.getWeather(position.coords.latitude, position.coords.longitude);
	}
	badWeather = () => {
		this.setState({ loading: true, access: false });
		this.getWeather(52.018082, 47.819569)
	}
	getWeather = async (latitude, longitude) => {
		var data = null;
		await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
			.then((res) => res.json()).then((res) => { data = res });
		this.setState({ loading: false, success: true, data: data });
	}
}

class Favorite extends React.Component {
	constructor(props) {
		super(props);
		this.handler = this.handler.bind(this);
		//var newData = JSON.parse(window.localStorage.getItem('favorite'));
		store.dispatch({ type: "FAVORITE_LOAD" });
		var newData = store.getState();
		this.state = { data: newData };
	}
	handler() {
		var newData = store.getState();
		this.setState({ data: newData });
	}
	render() {
		return (
			<div>
				<FavoriteSearch handler={this.handler} />
				<div class="FavoriteContainer">
					{
						this.state.data.map((favCity, i = 0) => {
							i++;
							return ([<FavoriteItem value={favCity} handler={this.handler} />])
						}
						)
					}
				</div>
			</div>
		)
	}
}
class FavoriteItem extends React.Component {
	render() {
		if (this.props.value === null) { return <div></div>; }
		else {
			return (
				<div class="FavoriteItem">
					<button type="submit" class="btn btn-warning" onClick={() => {
						console.log("REMOVE");
						store.dispatch({ type: "FAVORITE_REMOVE", payload: this.props.value["name"] })
						this.props.handler();
					}} >&#10006;</button>
					<WeatherData value={this.props.value} />
				</div>
			);
		}
	}
}

class WeatherData extends React.Component {
	render() {
		var WeatherData = this.props.value;
		console.log("here");
		console.log(WeatherData)
		return (
			<div class="WeatherData">
				<div class="WeatherTop">
					<h2>{WeatherData["name"]}</h2>
					<img src={"http://openweathermap.org/img/wn/" + WeatherData["weather"][0]["icon"] + ".png"} alt=""></img>
					<h3>{WeatherData["main"]["temp"]} &#8451;</h3>
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
class FavoriteSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		this.addGeo(this.state.value);
		event.preventDefault();
	}

	async addGeo(value) {
		var result = null;
		await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
			.then((res) => res.json()).then((res) => { result = res });
		console.log("recevied");
		console.log(result);
		if (result != null && result["cod"] === 200) {
			store.dispatch({ type: "FAVORITE_ADD", payload: result })
			//data.push(result);
			//window.localStorage.setItem("favorite", JSON.stringify(data));
			this.props.handler();
			var data = store.getState();
			this.setState({ loading: false, success: true, data: data });
		} else {
			alert("City doesn't founded(")
		}
		//window.localStorage.setItem('favorite', JSON.stringify(data));

	}
	render() {
		return (
			<div>
				<h2>Favorite</h2>
				<form onSubmit={this.handleSubmit}>
					<input type="search" value={this.state.value} onChange={this.handleChange}></input>
					<button type="submit" class="btn btn-warning" >Add</button>
				</form>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<div name="MainWeather">
					<MainWeather />
				</div>
				<div name="Favorite">
					<Favorite />
				</div>
			</div>
		)
	}
}
// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// ========================================
function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i]["name"] === obj["name"]) {
			return true;
		}
	}
	return false;
}