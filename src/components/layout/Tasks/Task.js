import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core/';
import ClearIcon from '@material-ui/icons/Clear';
import * as actionCreator from '../../../store/actions/actions'
import * as userActionCreator from '../Profile/User/store/userActions'
import { FiClock, FiMapPin, FiTag, FiHeart } from "react-icons/fi";
// FiHeart, FiSearch, FiTag, FiKey,FiCheckCircle,


function Task(props) {
    let task = props.task

    const [modal, setModal] = useState(false)
    const [offerPrice, setOfferPrice] = useState('');
    const [offerMessage, setOfferMessage] = useState('');
    const [Task_User_id, setTask_user_id] = useState('');
    const [Task_task_ID, setTask_task_ID] = useState('');
    const addToFav = (taskId) => {
        let value = {
            authUserID: props.authUser.id,
            taskId
        }
        props.addFav(value)
        // ako nije dodaj ako jeste vrati notifikaciju
    }
    const handleOffer = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let offerCreated_at = `${day}.${month}.${year}`
        let offer = {
            offerMessage,
            offerPrice,
            offerCreated_at,
            offerApproved: false,
            Task_User_id,
            Task_task_ID,
            User_id: props.authUser.id
        }
        if (props.authUser.credit > 0) {
            props.sendOffer(offer)
            let usersCredit = {
                credit: props.authUser.credit,
                userId: props.authUser.id
            }
            props.deductCredit(usersCredit)

        } else {
            console.log('NEMA VISE KREDITA');
        }
    }
    // kategorija, grad, datum i vreme, favorit, description, title, userName,user rank
    return (
        <div className="singleTaskWrapper">
            {modal ? <div className="applyModalFormWrapper">
                <div className="applyModalForm">
                    <div className="applyForm">
                        <div >
                            <p className='closeModal ' onClick={() => setModal(false)}><ClearIcon /></p>
                        </div>
                        <h6>PONUDA</h6>
                        <div className="applyInputs">
                            <div className='applyFormItem'><TextField variant="outlined" label='Cena' fullWidth onChange={(e) => {
                                setOfferPrice(e.target.value)
                            }} /></div>
                            <div className='applyFormItem'><TextField multiline variant="outlined" label='Ponuda' fullWidth onChange={(e) => {
                                setOfferMessage(e.target.value)
                            }} /></div>
                        </div>
                        <p className='applyFormActions' onClick={() => {
                            handleOffer()
                            setModal(false)
                        }}>POSALJI PONUDU</p>

                    </div>
                </div>
            </div> : null}


            <div className="singleTaskContent">
                <div className="singleTaskCard">
                    <div className="singleTaskTitle">
                        <h2>{task.taskTitle}</h2>
                    </div>
                    <div className="singleTaskInfo">
                        <div className="singleTaskInfoBlock">

                            <div className="singleTaskPrice taskInfoDetails">
                                <FiTag className="singleTaskPriceIcon" />
                                <p>{task.taskPrice}</p>
                            </div>
                            <div className="taskTown taskInfoDetails">
                                <FiMapPin className="singleTaskTownIcon" />
                                {task.town ? <p>{task.town}</p> : null}
                            </div>
                            <div className="taskTime taskInfoDetails">
                                <FiClock className="singleTaskTimeIcon" />
                                <p>{task.taskStartDate}</p>
                            </div>
                            <div className="taskFav taskInfoDetails">
                                <FiHeart className='singleTaskFavIcon' onClick={() => {
                                    addToFav(task.task_ID);
                                }} />
                                <p>Sacuvaj</p>
                            </div>
                        </div>
                        <p className='singleTaskActionBTN' onClick={() => {
                            setModal(true)
                            setTask_user_id(task.User_id)
                            setTask_task_ID(task.task_ID)
                        }}>APLICIRAJ</p>
                    </div>
                    <div className="singleTaskDescription">
                        <h2>Opis posla</h2>
                        {task.taskDescription}
                    </div>
                </div>

            </div>
            {/* <div className="singleTaskContent">
                <div className='taskCard singleTaskCard' key={task.task_ID}>
                    <div className='taskCardContent' >
                        <div>
                            <h4 className='taskCardTitle' variant="h5">{task.taskTitle}</h4>
                        </div>
                        <div className='taskCardInfo1' >
                            <p className='taskCardItem category'>Kategorija: <span>{task.taskCategory}</span> </p>
                            <p className='taskCardItem date'>Datum: <span> {task.taskStartDate} / {task.taskEndDate}</span></p>
                            <p className='taskCardItem date'>Vreme: <span>{task.taskStartTime}</span> - <span>{task.taskEndTime}</span> </p>
                            <p color='primary' className='taskCardItem price'>{task.taskPrice} din</p>
                        </div>
                        <div className='taskCardBody'>
                            <p>{task.taskDescription}</p>

                        </div>
                        <div className='taskCardInfo2'>
                            <p className='taskCardItem hour'>Postovano <span>{task.taskCreated_at}</span> </p>
                        </div>
                        <div className='taskCardAction'>
                            <FavoriteIcon className='taskActionBtn' onClick={() => {
                                console.log('add to favorite');
                            }} />
                            <button className='taskActionBtn applyBtn' onClick={() => {
                                setModal(true)
                                setTask_user_id(task.User_id)
                                setTask_task_ID(task.task_ID)
                            }}>APLICIRAJ</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        task: state.globalReducer.taskView,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendOffer: (offer) => dispatch(actionCreator.sendOffer(offer)),
        deductCredit: (usersCredit) => dispatch(actionCreator.deductCredit(usersCredit)),
        addFav: (value) => dispatch(userActionCreator.addFav(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Task)

