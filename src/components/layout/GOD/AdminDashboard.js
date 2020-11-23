import React, { useState } from 'react';
import Axios from 'axios'
// import AdminAllUsers from './AdminAllUsers'
// import AdminAllTasks from './AdminAllTasks'
import AdminSendNews from './AdminSendNews'
function AdminDashboard() {
    const [location, setLocation] = useState('')
    let handleLocation = async () => {
        let response = await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=aa1b2e2507e3478f9059aabe4850e45f&language=en&pretty=1`)
        console.log(response);

    }
    return (
        <div className="adminDashboardWrapper">
            <div className="adminContent">
                {/* <AdminAllUsers /> */}
                {/* <AdminAllTasks /> */}
                <AdminSendNews />
                <input type="text" onChange={(e) => {
                    setLocation(e.target.value)
                }} />
                <button onClick={() => {
                    handleLocation()
                    console.log(location);
                }} >send</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
