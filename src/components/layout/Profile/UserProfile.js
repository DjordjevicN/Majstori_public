import React from 'react';
// import * as actionCreator from '../../../store/actions/actions'
import { connect } from 'react-redux'
import { FcHome, FcPhoneAndroid, FcFeedback, FcInspection, FcMoneyTransfer, FcApproval } from "react-icons/fc";
function UserProfile(props) {
    let user = props.user[0];
    let services = props.user;
    console.log(user);
    return (
        <div className="userProfileWrapper">

            {user && <div className="userProfileContent">
                <div className="userProfileInfo">
                    <div className="userProfileAvatar">
                        {user.avatar ? <img src={`http://localhost:3001/uploads/${user.avatar}`} alt="profile" className='userProfileAvatarImage' /> : <img src="./images/zanatlija.png" className='userProfileAvatarImage' alt="profile" />}


                    </div>
                    <div className="userProfilePersonal">
                        <div className="userProfileName">
                            {user.firstName ? <h2>{user.firstName}</h2> : <h2>{user.email}</h2>}
                            <FcApproval />

                        </div>
                        <div className="userProfileContact">
                            <div className="userProfileDoneJobs">
                                <FcInspection />
                                {user.completedTasks ? <p >
                                    {user.completedTasks} Zavrsenih poslova
                                                </p> : <p >0 Zavrsenih poslova</p>}
                            </div>
                            {user.address && <div className="userProfileAddress">
                                <FcHome />
                                <p>{user.address}</p>
                            </div>}
                            {user.phoneNumber && <div className="userProfilePhoneNumber">
                                <FcPhoneAndroid />
                                <p>{user.phoneNumber}</p>
                            </div>}
                            {user.phoneNumber2 && <div className="userProfilePhoneNumber2">
                                <FcPhoneAndroid />
                                <p>{user.phoneNumber}</p>
                            </div>}
                            <div className="userProfileEmail">
                                <FcFeedback />
                                <p>{user.email}</p>
                            </div>
                            <div className="userProfileJoined">
                                <img className="userProfileJoinedIcon" src="/images/zanatlijeLogo6.png" alt="" />
                                <p>{user.created_at}</p>
                            </div>
                        </div>
                    </div>
                    <div className="userProfileTaskerGrade">
                        <div className="userProfileGradeIcon">
                            <h3>8.8</h3>
                        </div>
                    </div>
                </div>
                {user.aboutMe && <div className="userProfileAboutMe">
                    <h4>O meni</h4>
                    <p>{user.aboutMe}</p>

                </div>}

                <hr />
                <div className="userProfileSectionTitle">
                    <h4>Moje Usluge</h4>
                </div>
                {services.length > 0 && services.map((item) => (
                    <div className="userProfileServiceInformation" key={item.service_ID}>
                        <div className="userProfileServicePriceAndCategory">
                            <div className="userProfileServiceCategory">
                                <h4>{item.serviceCategory}</h4>
                            </div>
                            <div className="userProfileServicePrice">
                                <FcMoneyTransfer />
                                {item.servicePrice ? <h4>{item.servicePrice}</h4> : <h4>Kontakt</h4>}
                            </div>
                        </div>
                        <div className="userProfileServiceDescription">
                            <p>{item.serviceDescription}</p>
                        </div>
                    </div>
                ))}
            </div>}

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

