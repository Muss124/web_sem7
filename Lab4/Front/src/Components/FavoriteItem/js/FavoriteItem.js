import React from 'react';
import {WeatherData} from "../../WeatherData/js/WeatherData"
import '../css/FavoriteItem.css'


export class FavoriteItem extends React.Component {
	render() {
		if (Object.keys(this.props.value).length === 1) {
			return (
				<div>
					{this.props.value.CityName}
					<div className="spinner-border text-danger" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="FavoriteItem">
					<WeatherData value={this.props.value} isMain={false}/>
				</div>
			);
		}
	}
}