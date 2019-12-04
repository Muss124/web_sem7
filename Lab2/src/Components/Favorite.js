import React from 'react';
import { FavoriteSearch } from "./FavoriteSearch.js"
import { connect } from 'react-redux'
import { FavoriteItem } from "./FavoriteItem.js"

class Favorite extends React.Component {
    render() {
        return (
            <div>
                <FavoriteSearch />
                <div class="FavoriteContainer" >
                    {
                        this.props.data.map((favCity, i = 0) => {
                            i++;
                            return ([

                                <FavoriteItem value={favCity} />

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