import React from 'react';
import {WeatherData} from "../../WeatherData/js/WeatherData"
import '../css/FavoriteItem.css'


export class FavoriteItem extends React.Component {
	render() {
		console.log(this.props.value.data);
		console.log(this.props.value.data.length === 0);
		if (this.props.value.data.length === 0) {
			return (
				<div>
					{this.props.value.city}
					<div className="spinner-border text-danger" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className="FavoriteItem">
					<WeatherData value={this.props.value.data} isMain={false}/>
				</div>
			);
		}
	}
}