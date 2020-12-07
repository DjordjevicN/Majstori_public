import React from 'react';
// import ProfileForm from '../Profile/User/ProfileForm';
import ProfileForm from '../User/ProfileForm';
import ServiceForm from '../UserServices/ServiceForm';
import TaskForm from '../UserTasks/TaskForm';
// import Shop from '../Shop/Shop'
function UserSettings() {
    return (
        <div>
            <ProfileForm />
            <ServiceForm />
            <TaskForm />
        </div>
    );
}

export default UserSettings;
