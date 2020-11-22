import React, { useState } from 'react';
import ProfileForm from '../Profile/User/ProfileForm';
import ServiceForm from '../Profile/UserServices/ServiceForm';
import TaskForm from '../Profile/UserTasks/TaskForm';
import NoForm from '../../forms/NoForm';
import User from '../Profile/User/User'
import UserTasks from '../Profile/UserTasks/UserTasks'
import UserServices from '../Profile/UserServices/UserServices'
import UserOffer from '../Profile/UserOffers/UserOffer'
import News from '../News/News'
import UserProposals from './UserProposals/UserProposals'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WarningIcon from '@material-ui/icons/Warning';
import * as actionCreator from '../News/store/NewsActions'
import { connect } from 'react-redux';
function UserDashboard(props) {
    const [dashForm, setDashForm] = useState(<ProfileForm />)
    const [dashPage, setDashPage] = useState(<User />)

    return (
        <div className='dashboardWrapper'>
            {/* MENU  */}
            <div className="dashboardContent">
                <div className='profileFormComponentWrapper'>

                    <div className="dashMenuWrap">
                        <div className="dashMenu">
                            <button className="dashMenuItem" onClick={() => {
                                setDashForm(<ProfileForm />)
                                setDashPage(<User />)
                            }}><PersonIcon className="dashMenuItemIcon" /></button>
                            <button className="dashMenuItem" onClick={() => {
                                setDashForm(<ServiceForm />)
                                setDashPage(<UserServices />)
                            }}><WorkIcon className="dashMenuItemIcon" /></button>
                            <button className="dashMenuItem" onClick={() => {
                                setDashForm(<TaskForm />)
                                setDashPage(<UserTasks />)
                            }}><LibraryBooksIcon className="dashMenuItemIcon" /></button>
                            <button className="dashMenuItem" onClick={() => {
                                setDashForm(<NoForm />)
                                setDashPage(<UserOffer />)
                            }}><LibraryAddCheckIcon className="dashMenuItemIcon" /></button>
                            <button className="dashMenuItem" onClick={() => {
                                setDashForm(<NoForm />)
                                setDashPage(<UserProposals />)
                            }}><DoneAllIcon className="dashMenuItemIcon" /></button>
                            <button className="dashMenuItem" onClick={() => {
                                props.getAllNews()
                                setDashPage(<News />)
                                setDashForm(<NoForm />)

                            }}><WarningIcon className="dashMenuItemIcon" /></button>
                        </div>
                    </div>
                    {/* CONTENT  */}
                    <div className="dashMainContentWrapper">
                        {dashPage}

                    </div>
                    {/* FORM  */}
                    <div className="dashFormWrapper">
                        {dashForm}

                    </div>

                </div>
            </div>

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllNews: () => dispatch(actionCreator.getAllNews())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);