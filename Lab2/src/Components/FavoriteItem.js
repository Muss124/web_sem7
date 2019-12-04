import React from 'react';
import {WeatherData} from "./WeatherData.js"

export class FavoriteItem extends React.Component {
	render() {
		
		if (this.props.value.loading) {
			return (
				<div>
					{this.props.value.city}
					<div class="spinner-border text-danger" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			);
		}
		else {
			return (
				<div class="FavoriteItem">
					<WeatherData value={this.props.value.data} />
				</div>
			);
		}
	}
}