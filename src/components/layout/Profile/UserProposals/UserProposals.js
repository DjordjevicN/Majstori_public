import React from 'react';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import { FiRefreshCw, FiTrash2 } from "react-icons/fi";
function UserProposals(props) {
    let authUserId = props.authUser.id
    let myProposals = props.myProposals;
    return (
        <div className='proposalDash'>
            < FiRefreshCw className='proposalRefreshInbox' onClick={() => {
                props.getMyProposals(authUserId)
            }} />
            {myProposals.length > 0 ? myProposals.map((item) => (
                <div className="proposalDashCard" key={item.offer_ID}>
                    <div className="proposalDashInfoTop">
                        <h4 className="proposalTitle">{item.taskTitle}</h4>

                    </div>
                    <p className="proposalDescription">{item.taskDescription}</p>
                    <div className='proposalPrices'> <span>{item.taskPrice}</span><TrendingFlatIcon /> <span>{item.offerPrice}</span>
                    </div>
                    <div>

                        <div className="proposalCreated">
                            <p>Postovano: <span>{item.offerCreated_at}</span></p>
                        </div>
                        <div className="proposalMessageWrap">
                            <p className="proposalMessageTitle">Moja poruka</p>
                            <p className="proposalMessage">{item.offerMessage}</p>
                        </div>
                    </div>
                    <div className="proposalActions">
                        <FiTrash2 className="proposalRemove" />
                    </div>
                </div>
            )) : <div>inbox is empty</div>
            }

        </div >
    );
}


const mapStateToProps = (state) => {
    return {
        myProposals: state.User.myProposals,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMyProposals: (authUserId) => dispatch(actionCreator.getMyProposals(authUserId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProposals);