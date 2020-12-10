import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { FiCheckCircle, FiClock, FiMapPin, FiTag } from "react-icons/fi";
import * as actionCreator from '../../../../store/actions/actions'
import * as userActionCreator from '../User/store/userActions'
function FavoritePage(props) {
    let myFavoriteTasks = props.myFavoriteTasks;
    console.log(myFavoriteTasks);
    return (
        <div className="favWrapper">
            {myFavoriteTasks.length > 0 ? myFavoriteTasks.map((item) => (
                <div className="taskCard" key={item.task_ID}>
                    <div className="taskCorner">
                        <img className="taskCornerImage" src={`images/taskerRank${item.userRank}.png`} alt='ll' />
                    </div>
                    <div className="taskCardContent">
                        <div className="taskText">
                            <div className="taskUser">
                                <FiCheckCircle className="taskUserIcon" />
                                {item.firstName ? <p>{item.firstName}</p> : null}
                            </div>
                            <div className="taskTitle">
                                <h2>{item.taskTitle}</h2>
                                <div> {item.taskDescription ? <p>{item.taskDescription.substring(0, 100)}<span> ...</span></p> : null}
                                </div>
                            </div>
                        </div>
                        <div className="taskInfo">
                            <div className="taskPrice taskInfoDetails">
                                <FiTag className="taskPriceIcon" />
                                <p>{item.taskPrice}</p>
                            </div>

                            <div className="taskTown taskInfoDetails">
                                <FiMapPin className="taskTownIcon" />
                                {item.town ? <p>{item.town}</p> : null}
                            </div>
                            <div className="taskTime taskInfoDetails">
                                <FiClock className="taskTimeIcon" />
                                <p>{item.taskStartDate}</p>
                            </div>

                            <div className="cardActionWrap">
                                <p className='taskCTA' onClick={() => {
                                    props.getTaskById(item.task_ID)
                                }} ><Link className='link' to={`/task/${item.task_ID}`}>Detaljnije</Link></p>
                            </div>
                        </div>
                    </div>

                </div>

            )) : <div className="noUser">
                    <p>Trenutno nema novih poslova</p>
                </div>}

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        myFavoriteTasks: state.User.myFavoriteTasks,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendOffer: (offer) => dispatch(actionCreator.sendOffer(offer)),
        deleteFromFav: (id) => dispatch(userActionCreator.deleteFromFav(id)),
        getTaskById: (id) => dispatch(actionCreator.getTaskById(id)),
        deductCredit: (usersCredit) => dispatch(actionCreator.deductCredit(usersCredit)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)