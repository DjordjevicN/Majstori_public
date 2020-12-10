import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import * as globalActionCreator from '../../../../store/actions/actions'
function UserOffer(props) {
    let myOffers = props.myOffers;
    console.log(myOffers);
    return (
        <div className="applicationDashWrapper">
            <div className="applicationDashContent">
                {myOffers ? myOffers.map((item) => (
                    <div className="applicationDashCard" key={item.offer_ID}>
                        <Link className='applicationDashCardLink' to={`/userProfile/${item.id}`} onClick={() => {
                            console.log('click');
                            props.getFullProfileById(item.id)
                        }}>
                            <div className="applicationDashCardContent">
                                <div className="applicationDashCardInfo">
                                    <div className="applicationDashCardAvatarName">
                                        <div className="applicationDashCardAvatar">
                                            {item.avatar ? <img src={`http://localhost:3001/uploads/${item.avatar}`} alt="profile" className='applicationDashCardImage' /> : <img src="./images/zanatlija.png" className='applicationDashCardImage' alt="profile" />}
                                        </div>
                                        <div className="applicationDashCardName">
                                            <h2>{item.firstName}</h2>
                                        </div>
                                    </div>
                                    <div className='applicationDashCarPrice'>{item.offerPrice}din</div>
                                </div>
                                <div className="applicationDashCardTitle">
                                    <h4>{item.taskTitle}</h4>
                                </div>
                                <div className="applicationDashCardDescription">
                                    <p>{item.offerMessage}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )) : null}

            </div>
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
        getMyOffers: (authUserId) => dispatch(actionCreator.getMyOffers(authUserId)),
        getFullProfileById: (id) => dispatch(globalActionCreator.getFullProfileById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOffer);
