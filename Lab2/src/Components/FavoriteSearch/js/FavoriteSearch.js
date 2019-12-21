import React from "react"
import store from "../../../store"
import { itemsFetchDataRef, itemsFetchData } from "../../../Actions/reques"
import '../css/FavoriteSearch.css'

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
        store.dispatch({ type: "FAVORITE_ADD", payload: { city: value, data: [] } });
        store.dispatch(itemsFetchData(value));
    }
    render() {
        return (
            <div className="searchform">
                <div>
                    <h1>Favorite</h1>
                </div>
                <div className="searchformInside">
                    <form onSubmit={this.handleSubmit}>
                        <input type="search" value={this.state.value} onChange={this.handleChange}></input>
                        <button type="submit" className="btn btn-secondary btn-circle" >Add</button>
                    </form>
                    <button className="btn btn-secondary" onClick={() => {
                        console.log("REFRESH");
                        var refData = store.getState();
                        refData.forEach(el => {
                            console.log(el);
                            store.dispatch(itemsFetchDataRef(el.city));
                        });
                    }} >&#8634;</button>
                </div>
            </div>
        );
    }
}