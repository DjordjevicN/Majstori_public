import React from 'react';
// import AdminAllUsers from './AdminAllUsers'
// import AdminAllTasks from './AdminAllTasks'
import AdminSendNews from './AdminSendNews'
function AdminDashboard() {
    return (
        <div className="adminDashboardWrapper">
            <div className="adminContent">
                {/* <AdminAllUsers /> */}
                {/* <AdminAllTasks /> */}
                <AdminSendNews />
            </div>
        </div>
    );
}

export default AdminDashboard;
