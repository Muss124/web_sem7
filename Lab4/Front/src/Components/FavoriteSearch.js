import React from "react"
import store from "../store.js"
import { itemsFetchData } from "../Actions/reques.js"

export class FavoriteSearch extends React.Component {
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

    addGeo(value) {
        // new shit 
        store.dispatch({ type: "FAVORITE_ADD", payload: { loading: true, city: value } });
        store.dispatch(itemsFetchData(value));
    }
    render() {
        return (
            <div class="searchform">
                <div>
                    <h1>Favorite</h1>
                </div>
                <div class="searchformInside">
                    <form onSubmit={this.handleSubmit}>
                        <input type="search" value={this.state.value} onChange={this.handleChange}></input>
                        <button type="submit" class="btn btn-secondary btn-circle" >Add</button>
                    </form>
                </div>
            </div>
        );
    }
}