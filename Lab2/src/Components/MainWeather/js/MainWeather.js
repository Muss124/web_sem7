import React from "react"
import { WeatherData } from "../../WeatherData/js/WeatherData"
import { transform } from '../../../Actions/weather'
import '../css/MainWeather.css'


export class MainWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}
	componentDidMount() {
		this.checkGeo();
	}
	checkGeo() {
		if (navigator.geolocation === undefined) {
			this.badWeather();
		}
		else {
			navigator.geolocation.getCurrentPosition(this.goodWeather, this.badWeather)
		}
	}
	render() {
		if (this.state.loading) {
			return (
				<div className="spinner-border text-danger" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			);
		}
		if (this.state.success) {
			var value = this.state.data;
			console.log(value);
			return (
				<div className="UpperWeather">
					<button type="button" className="btn btn-secondary" onClick={() => { this.setState({ loading: true }); this.checkGeo() }}>Refresh geolocation</button>
					<div className="TopCityWeather">
						<WeatherData value={value} isMain={true} />
					</div>
				</div>
			);
		}
		if (!this.state.access)
			return (<div><h1>Access error</h1></div>);

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
		await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
			.then((res) => res.json())
			.then((res) => { this.setState({ loading: false, success: true, data: transform(res) }) })
			.catch(() => { this.setState({ loading: false, success: false }) });
	}
}