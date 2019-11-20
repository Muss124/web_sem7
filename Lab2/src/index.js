import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

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
					<div>
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
		var newData = JSON.parse(window.localStorage.getItem('favorite'));
		this.state = { data: newData };
	}
	handler() {
		var newData = JSON.parse(window.localStorage.getItem('favorite'));
		this.setState({ data: newData });
	}
	render() {
		return (
			<div>
				<FavoriteSearch handler={this.handler} />
				<div>
					{
						this.state.data.map((favCity, i = 0) => {
							i++;
							return ([<FavoriteItem value={favCity} />])
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
				<div>
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
			<div>
				<h2>Weather in {WeatherData["name"]}</h2>
				<div>
					<img src={"http://openweathermap.org/img/wn/" + WeatherData["weather"][0]["icon"] + ".png"} alt=""></img>
					<h3>{WeatherData["main"]["temp"]} &#8451;</h3>
				</div>
				<li>Weather {WeatherData["weather"][0]["description"]}</li>
				<li>Humidity (%) {WeatherData["main"]["humidity"]}</li>
				<li>Pressure (hPa) {WeatherData["main"]["pressure"]}</li>
				<li>Wind speed (meter/sec) {WeatherData["wind"]["speed"]}</li>
				<li>Longitude {WeatherData["coord"]["lon"]}</li>
				<li>Latitude {WeatherData["coord"]["lat"]}</li>
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
		var data = JSON.parse(window.localStorage.getItem('favorite'));
		if (data === null) {
			data = [];
		}
		var result = null;
		await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
			.then((res) => res.json()).then((res) => { result = res });
		console.log("recevied")
		console.log(result);
		if (result != null && result["cod"] === 200) {
			data.push(result);
			window.localStorage.setItem("favorite", JSON.stringify(data));
			this.props.handler();
		} else {
			alert("City doesn't founded(")
		}
		window.localStorage.setItem('favorite', JSON.stringify(data));
		//this.setState({ loading: false, success: true, data: data });
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
