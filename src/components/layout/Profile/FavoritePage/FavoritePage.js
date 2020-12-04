import React from 'react';
import { connect } from 'react-redux'
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import { TextField } from '@material-ui/core/';
// import ClearIcon from '@material-ui/icons/Clear';
import * as actionCreator from '../../../../store/actions/actions'
import * as userActionCreator from '../User/store/userActions'
function FavoritePage(props) {
    let id = 6
    return (
        <div className="favWrapper">
            <button onClick={() => {
                props.deleteFromFav(id)
            }}>REMOVE</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        myFavoriteTasks: state.User.myFavoriteTasks,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendOffer: (offer) => dispatch(actionCreator.sendOffer(offer)),
        deleteFromFav: (id) => dispatch(userActionCreator.deleteFromFav(id)),
        deductCredit: (usersCredit) => dispatch(actionCreator.deductCredit(usersCredit)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)