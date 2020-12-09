import React from 'react';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import { FcHome, FcMoneyTransfer } from "react-icons/fc";
import { FiClock, FiTag, FiXOctagon } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion'
function UserTasks(props) {
    let myTasks = props.myTasks;
    let authUser = props.authUser;
    return (
        <div className='taskDashPageWrapper'>
            <div className="taskDashPageContent">
                <div className="taskDashSectionTitle">
                    <h3>Manage Jobs</h3>
                </div>
                {myTasks.length > 0 &&
                    <div className="taskDashGrid">
                        <AnimatePresence>
                            {myTasks.map((item) => (
                                <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="taskDashCardWrapper" key={item.task_ID}>
                                    <div className="taskDashCardOuter">
                                        <img className='taskerCardRank' src={`/images/taskerRank${authUser.userRank}.png`} alt="taskerRank2" />
                                        <div className="taskDashDeleteTask" onClick={() => {
                                            props.deleteTask({
                                                userId: props.authUser.id,
                                                taskId: item.task_ID
                                            })
                                        }}>
                                            <FiXOctagon className="taskDashDeleteTaskIcon" />
                                        </div>
                                    </div>
                                    <div className="taskDashCardInner">
                                        <div className='taskDashCardInnerInformation'>
                                            <div className="taskDashTitle">
                                                <h3>{item.taskTitle}</h3>
                                            </div>
                                            <div className="taskDashInfo">
                                                <div className="taskDashPrice">
                                                    <FcMoneyTransfer className="taskDashPriceIcon" />
                                                    <p>{item.taskPrice}</p>
                                                </div>
                                                <div className="taskDashLocation">
                                                    <FcHome className="taskDashLocationIcon" />
                                                    <p>Beograd</p>
                                                </div>
                                                <div className="taskDashCategory">
                                                    <FiTag className="taskDashCategoryIcon" />
                                                    <p>{item.taskCategory}</p>
                                                </div>
                                                <div className="taskDashDate">
                                                    <FiClock className="taskDashDateIcon" />
                                                    <p>{item.taskStartDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="taskDashCardCTA" onClick={() => {
                                            console.log(item.task_ID);
                                        }} >
                                            <p>Detaljnije</p>
                                        </div>
                                        <div className='taskDashCardInnerAppliers'>
                                            <div className="numberOfApplications">
                                                <p>5</p>
                                            </div>
                                            <div className="taskDashCardInnerText">
                                                Aplikacija
                                        </div>
                                            <div className="taskDashCardInnerApplicants">
                                                {/* max 6 */}
                                                <img src='/images/noProfile.jpg' alt="userProfile" className="taskDashCardInnerApplicantsImage" />

                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                }

            </div>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        myTasks: state.User.myTasks,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (id) => dispatch(actionCreator.deleteTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTasks);


{/* <div className="taskDashGrid">
                {props.myTasks.length > 0 ?
                    <div className="myTasks">
                        {props.myTasks.map((item) => (
                            <div className='dashTaskCard' key={item.task_ID}>
                                <div className='taskCardContent' >
                                    <div>
                                        <h4 className='taskCardTitle'>{item.taskTitle}</h4>
                                    </div>
                                    <div className='taskCardInfo1' >
                                        <p className='taskCardItem category'>Kategorija: <span>{item.taskCategory}</span> </p>
                                        <p className='taskCardItem date'>Datum: <span> {item.taskStartDate} / {item.taskEndDate}</span></p>
                                        <p className='taskCardItem date'>Vreme: <span>{item.taskStartTime} / {item.taskEndTime}</span></p>
                                        <p className='taskCardItem price'>{item.taskPrice} din</p>
                                    </div>
                                    <div className='dashTaskCardBody'>
                                        <p>{item.taskDescription} </p>
                                    </div>
                                    <div className='taskCardInfo2'>
                                        <p className='taskCardItem hour'>Postovano <span>{item.taskCreated_at}</span></p>

                                    </div>
                                    <div className='taskCardButtonWrap'>
                                        <p className='taskCardButton' onClick={() => {
                                            props.deleteTask({
                                                userId: props.authUser.id,
                                                taskId: item.task_ID
                                            })
                                        }}>OBRISI</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }

                    </div> : <div>
                        <p className="noTasks">Trenutno nema aktivnih poslova</p>
                    </div>}
            </div> */}