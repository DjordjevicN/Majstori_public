import React, { useState } from 'react';
import ProfileForm from '../Profile/User/ProfileForm';
import ServiceForm from '../Profile/UserServices/ServiceForm';
import TaskForm from '../Profile/UserTasks/TaskForm';
import NoForm from '../../forms/NoForm';
import User from '../Profile/User/User'
import UserTasks from '../Profile/UserTasks/UserTasks'
import UserServices from '../Profile/UserServices/UserServices'
// import OfferDash from '../dashboard/OfferDash'
import UserOffer from '../Profile/UserOffers/UserOffer'
import News from '../News/News'
// import ProposalsDash from '../dashboard/ProposalsDash'
import UserProposals from './UserProposals/UserProposals'

import DoneAllIcon from '@material-ui/icons/DoneAll';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WarningIcon from '@material-ui/icons/Warning';

function UserDashboard() {
    const [dashForm, setDashForm] = useState(<ProfileForm />)
    const [dashPage, setDashPage] = useState(<User />)

    return (
        <div className='dashboardWrapper'>
            {/* MENU  */}

            <div className='profileFormComponentWrapper'>
                <div className="dashMenuWrap">
                    <div className="dashMenu">
                        <button className="dashMenuItem" onClick={() => {
                            setDashForm(<ProfileForm />)
                            setDashPage(<User />)
                        }}><PersonIcon /></button>
                        <button className="dashMenuItem" onClick={() => {
                            setDashForm(<ServiceForm />)
                            setDashPage(<UserServices />)
                        }}><WorkIcon /></button>
                        <button className="dashMenuItem" onClick={() => {
                            setDashForm(<TaskForm />)
                            setDashPage(<UserTasks />)
                        }}><LibraryBooksIcon /></button>
                        <button className="dashMenuItem" onClick={() => {
                            setDashForm(<NoForm />)
                            setDashPage(<UserOffer />)
                        }}><LibraryAddCheckIcon /></button>
                        <button className="dashMenuItem" onClick={() => {
                            setDashForm(<NoForm />)
                            setDashPage(<UserProposals />)
                        }}><DoneAllIcon /></button>

                        <button className="dashMenuItem" onClick={() => {
                            setDashPage(<News />)
                            setDashForm(<NoForm />)
                        }}><WarningIcon /></button>
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
    );
}

export default UserDashboard;
