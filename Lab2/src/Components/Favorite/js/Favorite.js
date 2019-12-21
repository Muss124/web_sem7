import React from 'react';
import { FavoriteSearch } from "../../FavoriteSearch/js/FavoriteSearch"
import { connect } from 'react-redux'
import { FavoriteItem } from "../../FavoriteItem/js/FavoriteItem"
import '../css/Favorite.css'

class Favorite extends React.Component {
    render() {
        return (
            <div>
                <FavoriteSearch />
                <div className="FavoriteContainer" >
                    {
                        this.props.data.map((favCity, i = 0) => {
                            i++;
                            return ([

                                <FavoriteItem value={favCity} key={i}/>

                            ])
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        data: state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName: () => {
            dispatch({
            });
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);