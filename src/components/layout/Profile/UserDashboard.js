import React, { useState } from 'react';
import * as actionCreator from '../News/store/NewsActions'
import * as userActionCreator from '../Profile/User/store/userActions'
import { connect } from 'react-redux';
import { motion } from 'framer-motion'
import { FcPhoneAndroid, FcFeedback, FcApproval, FcNext, FcPrevious } from "react-icons/fc";
// FcHome,FcInspection, FcMoneyTransfer, FcMenu,  FcSettings,

// PAGES
// import User from '../Profile/User/User'
import ProfileForm from '../Profile/User/ProfileForm';
// import ServiceForm from '../Profile/UserServices/ServiceForm';
// import TaskForm from '../Profile/UserTasks/TaskForm';
// import Shop from '../Profile/Shop/Shop'
import Settings from '../Profile/UserSettings/UserSettings'
import UserAdditionalInfo from '../../forms/UserAdditionalInfo';
import UserTasks from '../Profile/UserTasks/UserTasks'
import UserOffer from '../Profile/UserOffers/UserOffer'
import UserProposals from './UserProposals/UserProposals'
import UserServices from '../Profile/UserServices/UserServices'
import News from '../News/News'
import FavoritePage from './FavoritePage/FavoritePage'


function UserDashboard(props) {
    // const [dashForm, setDashForm] = useState(<ProfileForm />)
    const [dashPage, setDashPage] = useState(<UserTasks />)
    const [dashMenuOpen, setDashMenuOpen] = useState(true)
    let User = props.authUser;
    return (
        <div className='dashboardWrapper'>
            {/* MENU  */}
            <div className="dashboardContent">
                {dashMenuOpen &&
                    <div className="userSideMenu">
                        <div className="userSideMenuProfile">
                            <div className="userSideMenuProfileAvatar">
                                <div className="userSideMenuProfileAvatarBox">
                                    {props.authUser.avatar ? <img src={`http://localhost:3001/uploads/${props.authUser.avatar}`} alt="profile" className='userSideMenuProfileImage' /> : <img src="./images/zanatlija.png" className='userSideMenuProfileImage' alt="profile" />}
                                </div>
                            </div>
                            <div className="userSideMenuInformation">
                                <div className="userSideMenuInformationBox">
                                    <div className="userSideMenuName userSideMenuInformationItem">
                                        <h4>{User.firstName}</h4>
                                        <FcApproval /></div>
                                    <div className="userSideMenuPhone userSideMenuInformationItem"> <FcPhoneAndroid />
                                        <p>{User.phoneNumber}</p>
                                    </div>
                                    <div className="userSideMenuEmail userSideMenuInformationItem"> <FcFeedback />
                                        <p>{User.email}</p>
                                    </div>
                                    <div className="userSideMenuUpdated userSideMenuInformationItem">
                                        <p>Updated: </p>
                                        <p>{User.updated_at}</p>
                                    </div>
                                    <div className="userSideMenuCreated userSideMenuInformationItem">
                                        <p>Created: </p>
                                        <p>{User.created_at}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userSideMenuItems">
                            <div className="userSideMenuItemsBox">
                                <div className="userSideMenuItem" >
                                    <p onClick={() => {
                                        setDashPage(<UserTasks />)
                                    }} >Moji Poslovi</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<UserOffer />)
                                    }} >Ponude</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<UserProposals />)
                                    }}>Moje Ponude</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<UserServices />)
                                    }}>Moje Usluge</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<FavoritePage />)
                                    }} >Sacuvano</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<News />)
                                    }} >Obavestenja</p>
                                </div>
                                <div className="userSideMenuItem">
                                    <p onClick={() => {
                                        setDashPage(<Settings />)
                                    }} >Podesavanja</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className='menuToggleWrapper' onClick={() => {
                    if (dashMenuOpen) {
                        setDashMenuOpen(false)
                    } else {
                        setDashMenuOpen(true)
                    }
                }} >
                    {dashMenuOpen ? <FcPrevious className='menuToggle' /> : <FcNext className='menuToggle' />}
                </div>
                <div className="dashboardContentDisplay">
                    <UserAdditionalInfo />
                    {dashPage}
                </div>
                <div className="dashboardAdditionalInformation">
                    <div className="userSideMenuItem">
                        <p onClick={() => {
                            setDashPage(<ProfileForm />)
                        }} >userSETINGS</p>
                    </div>
                </div>
            </div >
        </div >
    );
}


const mapStateToProps = (state) => {
    return {
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllNews: () => dispatch(actionCreator.getAllNews()),
        getMyFavoriteTasks: (id) => dispatch(userActionCreator.getMyFavoriteTasks(id))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);


//  <div className='profileFormComponentWrapper'>

// <div className="dashMenuWrap">
//     <div className="dashMenu">
//         <button className="dashMenuItem" onClick={() => {
//             setDashForm(<ProfileForm />)
//             setDashPage(<User />)
//         }}><PersonIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {
//             setDashForm(<ServiceForm />)
//             setDashPage(<UserServices />)
//         }}><WorkIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {
//             setDashForm(<TaskForm />)
//             setDashPage(<UserTasks />)
//         }}><LibraryBooksIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {
//             setDashForm(<NoForm />)
//             setDashPage(<UserOffer />)
//         }}><LibraryAddCheckIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {
//             setDashForm(<NoForm />)
//             setDashPage(<UserProposals />)
//         }}><DoneAllIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {

//             props.getMyFavoriteTasks(props.authUser.id)
//             setDashPage(<FavoritePage />)
//             setDashForm(<NoForm />)
//         }}><p className="dashMenuItemIcon" >FAV</p></button>
//         <button className="dashMenuItem" onClick={() => {
//             props.getAllNews()
//             setDashPage(<News />)
//             setDashForm(<NoForm />)
//         }}><WarningIcon className="dashMenuItemIcon" /></button>
//         <button className="dashMenuItem" onClick={() => {
//             setDashPage(<Shop />)
//             setDashForm(<NoForm />)
//         }}><p className="dashMenuItemIcon">SHOP</p></button>
//     </div>
// </div>

// <div className="dashMainContentWrapper">
//     {dashPage}

// </div>

// <div className="dashFormWrapper">
//     {dashForm}

// </div>

// </div> 
