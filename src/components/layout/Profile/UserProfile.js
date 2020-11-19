import React from 'react';
// import * as actionCreator from '../../../store/actions/actions'
import { connect } from 'react-redux'

function UserProfile(props) {
    console.log(props.user);
    let user = props.user[0];
    let services = props.user;
    console.log(user);
    return (
        <div className='userProfilePreviewWrapper'>
            <div className="userProfilePreviewContent">
                {user && <div className="userProfilePreviewInfoCard">
                    <div className="userProfilePreviewInfoContent">
                        <div className='userProfilePreviewInfoPicWrap'>
                            {user.avatar ? <img src={user.avatar} className='userProfilePreviewInfoPic' alt='ll' /> : <img className='userProfilePreviewInfoPic' src="/images/noProfile.jpg" alt="" />}

                        </div>
                        <div className='userProfilePreviewInfo'>
                            <p className='userPreviewName infoItem'> {user.firstName ? user.firstName : user.email} {user.lastName ? user.lastName : null}</p>
                            <p className='userPreviewEmail infoItem'><span>Email:</span> {user.email}</p>
                            <p className='userPreviewPhone infoItem'><span>Telefon:</span> {user.phoneNumber}</p>

                            <p className='userPreviewPhone infoItem'><span>Zavrsenih Poslova:</span> {user.completedTasks}</p>
                            <p className='userPreviewAddress infoItem'><span>Adresa:</span> {user.address}</p>
                            <p className='userPreviewPhone infoItem'><span>Status:</span> {user.taskerRank}</p>

                            <p className='userPreviewJoined infoItem'><span>Drug član od:</span> {user.created_at}</p>
                        </div>
                    </div>
                </div>}

                <div className="userProfilePreviewServicesCardWrapper">
                    {services && services.map((item) => (
                        <div className="userProfilePreviewCard" key={item.service_ID}>
                            <div className="userProfilePreviewCardCategoryAndPrice">
                                <div className="userProfilePreviewCardCategory">{item.serviceCategory}</div>
                                <div className="userProfilePreviewCardPrice">{item.servicePrice}</div>
                            </div>
                            <div className="userProfilePreviewCardDescription">{item.serviceDescription}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}



const mapStateToProps = (state,) => {
    return {
        user: state.globalReducer.serviceUserView
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {

//         getSearchServices: (category) => dispatch(actionCreator.getSearchServices(category)),
//         getFullProfileById: (id) => dispatch(actionCreator.getFullProfileById(id))
//     }
// }
export default connect(mapStateToProps, null)(UserProfile)

