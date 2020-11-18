import React from 'react';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'


function UserTasks(props) {

    return (
        <div className='taskDashPageWrapper'>
            <div className="taskDashGrid">
                <div className="myTasks">
                    {/* *********************  */}
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
                                <div className='taskCardBody'>
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
                    ))}

                </div>
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
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (id) => dispatch(actionCreator.deleteTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTasks);
