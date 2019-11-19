import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

class Window extends React.Component {
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
    if (this.state.loading && !this.state.success) {
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
          <button type="button" class="btn btn-warning" onClick={() => this.checkGeo()}>Refresh geolocation</button>
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

class WeatherData extends React.Component {
  render() {
    var WeatherData = this.props.value;
    console.log("here");
    console.log(WeatherData)
    return (
      <div>
        <h2>Weather in {WeatherData["name"]}</h2>
        <img src={"http://openweathermap.org/img/wn/" + WeatherData["weather"][0]["icon"] + ".png"} alt=""></img>
        <h3>{WeatherData["main"]["temp"]} &#8451;</h3>
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

// ========================================

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
