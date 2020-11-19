import React from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import { FiRefreshCw } from "react-icons/fi";

function UserOffer(props) {

    let authUserId = props.authUser.id
    let myOffers = props.myOffers;
    return (
        <div className='applicationDash'>
            < FiRefreshCw className='applicationRefreshInbox' onClick={() => {
                props.getMyOffers(authUserId)
            }} />
            {myOffers.length > 0 ? myOffers.map((item) => (
                <div className="applicationDashCard" key={item.offer_ID}>
                    <div className="offerContent">
                        <div className="applicationDashInfoTop">
                            <div className="offerWho">{item.firstName ? <Link to={`UserProfile/${item.id}`} className="offerWhoLink"> {item.firstName} </Link> : <Link to={`UserProfile/${item.id}`} className="offerWhoLink">{item.email}</Link>} </div>
                            <div><TrendingFlatIcon /></div>
                            <div className="offerTaskName">{item.taskTitle}</div>
                        </div>
                        <div>
                            <div className="applicationDashText">
                                <p>{item.offerMessage}</p>
                            </div>
                            <div className="applicationDashOffer">
                                <div className='priceOffers'>
                                    <p>moja cena: <span>{item.taskPrice}</span> </p>
                                    <TrendingFlatIcon />
                                    <p>ponudjena cena: <span>{item.offerPrice}</span></p>
                                </div>
                                <p className='offerDate'>{item.offerCreated_at}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )) : <div>inbox is empty</div>}

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        myOffers: state.User.myOffers,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMyOffers: (authUserId) => dispatch(actionCreator.getMyOffers(authUserId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOffer);