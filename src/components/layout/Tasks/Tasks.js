import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom'
import * as actionCreator from '../../../store/actions/actions'
import options from '../../OptionsData'
import Map from '../MapComponent'

function Tasks(props) {
    const [openTab, setOpenTab] = useState(false)
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(0)
    let menuRef = useRef()
    let tasks = props.tasks;
    let filter = {
        category,
        page
    }
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setOpenTab(false)
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])
    const handleSearch = () => {
        if (category === '') {
            // props.clearTasksFromState()
            // props.getLatestTasks()
        } else {
            let filter = {
                category,
                page: 0
            }
            props.clearTasksFromState()
            props.getFilteredTasks(filter)
            setPage(10)
        }
    }
    const loadMore = () => {
        props.getFilteredTasks(filter)
        setPage(page + 10)
    }
    return (
        <div className='tasksRoot'>

            <div className="tasksWrapper">
                <div className='searchInputWrapper'>
                    <div className='searchInput'>
                        <div className="searchFormWrapper">
                            <div className="selectTab" onClick={() => {
                                if (openTab) {
                                    setOpenTab(false)
                                } else {
                                    setOpenTab(true)
                                }
                            }} >
                                {category === '' ? <p>Odaberi Kategoriju</p> : <p>{category}</p>
                                }
                                <KeyboardArrowDownIcon />

                            </div>
                        </div>
                        {openTab ? <div className="optionsWrapper">
                            <div className="options" ref={menuRef}>
                                {options.map((item) => {
                                    if (item.main) {
                                        return <div key={item.id} className="optionItems optionItemMain" onClick={() => {
                                            setCategory(item.value)
                                            setOpenTab(false)
                                        }} >{item.title}</div>
                                    }
                                    return <div key={item.id} className="optionItems " onClick={() => {
                                        setCategory(item.value)
                                        setOpenTab(false)
                                    }} >{item.title}</div>
                                })}
                            </div>
                        </div> : <div ref={menuRef}></div>}
                        <button className="searchButtons" onClick={() => {
                            setPage(0)
                            handleSearch()
                        }}>TRAZI</button>
                    </div>
                </div>
                <div className='taskCardWrapper'>

                    {tasks ? tasks.map((item) => (
                        <div className='taskCard' key={item.task_ID}>
                            <div className='taskCardContent' >
                                <div>
                                    <h4 className='taskCardTitle' variant="h5">{item.taskTitle}</h4>
                                </div>
                                <div className='taskCardInfo1' >
                                    <p className='taskCardItem category'>Kategorija: <span>{item.taskCategory}</span> </p>
                                    <p className='taskCardItem date'>Datum: <span> {item.taskStartDate} / {item.taskEndDate}</span></p>
                                    <p className='taskCardItem date'>Vreme: <span>{item.taskStartTime}</span> - <span>{item.taskEndTime}</span> </p>
                                    <p color='primary' className='taskCardItem price'>{item.taskPrice} din</p>
                                </div>
                                <div className='taskCardBody'>
                                    <div> {item.taskDescription ? <p>{item.taskDescription.substring(0, 100)}<span> ...Vise u Detaljima</span></p> : null}
                                    </div>
                                </div>
                                <div className='taskCardInfo2'>
                                    <p className='taskCardItem hour'>Postovano <span>{item.taskCreated_at}</span> </p>
                                </div>
                                <div className='taskCardAction'>
                                    <FavoriteIcon className='taskActionBtn' onClick={() => {
                                        console.log('add to favorite');
                                    }} />
                                    <Link to={`/task/${item.task_ID}`} onClick={() => {
                                        props.getTaskById(item.task_ID)
                                    }} className='taskActionBtn applyBtn'>DETALJNIJE</Link>
                                </div>
                            </div>
                        </div>
                    )) : <div className="noUser">
                            <p>Trenutno nema novih poslova</p>
                        </div>}
                </div>


                {tasks.length > 0 ? <p className='loadMoreBTN' onClick={() => {
                    loadMore()

                }} >LOAD MORE</p> : <p className='NoTasks'>Pronadjite taks iz vase kategorije</p>}
            </div>
            <div className="mapWrapper">
                <Map />
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        tasks: state.globalReducer.tasks,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLatestTasks: () => dispatch(actionCreator.getLatestTasks()),
        getFilteredTasks: (filter) => dispatch(actionCreator.getFilteredTasks(filter)),
        getTaskById: (taskId) => dispatch(actionCreator.getTaskById(taskId)),
        clearTasksFromState: () => dispatch(actionCreator.clearTasksFromState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)






