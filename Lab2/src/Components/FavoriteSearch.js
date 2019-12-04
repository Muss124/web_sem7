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
        store.dispatch({ type: "FAVORITE_ADD", payload: { loading: true, city: value, data: [] } });
        store.dispatch(itemsFetchData(value));
        //store.dispatch({ type: "FAVORITE_DATA", payload: value });
        // old shit
        /*
        store.dispatch({ type: "FAVORITE_ADD_BEF", payload: { loading: true, city: value, data: [] } })
        var result = null;

        await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=f8e5ebb3f762d1a58aaff7f643d7410b&units=metric')
            .then((res) => res.json()).then((res) => { result = res });
        console.log("recevied");
        console.log(result);
        if (result != null && result["cod"] === 200) {
            store.dispatch({ type: "FAVORITE_ADD_OK", payload: { loading: false, city: value, data: result } })
            //data.push(result);
            //window.localStorage.setItem("favorite", JSON.stringify(data));
            ////this.props.handler();
            ////var data = store.getState();
            ////this.setState({ loading: false, success: true, data: data });
        } else {
            alert("City doesn't founded(")
            store.dispatch({ type: "FAVORITE_ADD_ER", payload: value })
        }
        //window.localStorage.setItem('favorite', JSON.stringify(data));
        */
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