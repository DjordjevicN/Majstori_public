import React from 'react';
import { motion } from 'framer-motion'
import { connect } from 'react-redux'
function UserAdditionalInfo(props) {

    let activeJobs = props.myTasks.length;

    return (
        <div className='additionalWrapper' >
            <div className="additionalContent">
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .3, delay: .3, ease: "easeInOut" }} className="additionalInfoCard completedJobs">
                    <div>
                        <h3>{props.authUser.completedTasks ? props.authUser.completedTasks : 0}</h3>
                        <p>zavrsenih poslova</p>
                    </div>
                </motion.div>
                {/* <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .4, delay: .4, ease: "easeInOut" }} className="additionalInfoCard userStatus">
                    <div>
                        <h3>50%</h3>
                        <p>status</p>
                    </div>
                </motion.div> */}
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .5, ease: "easeInOut" }} className="additionalInfoCard usersToken">
                    <div>
                        <h3>{props.authUser.credit}</h3>
                        <p>token</p>
                    </div>
                </motion.div>
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6, delay: .6, ease: "easeInOut" }} className="additionalInfoCard ongoingJobs">
                    <div>
                        <h3>{activeJobs}</h3>
                        <p>aktivni poslovi</p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        myTasks: state.User.myTasks,
        authUser: state.User.authUser
    }
}

export default connect(mapStateToProps, null)(UserAdditionalInfo);

