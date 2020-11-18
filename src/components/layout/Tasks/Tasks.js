import React, { useState } from 'react';
import { TextField } from '@material-ui/core/';
import { connect } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom'
import * as actionCreator from '../../../store/actions/actions'



function Tasks(props) {
    const [openTab, setOpenTab] = useState(false)
    const [modal, setModal] = useState(false)
    const [category, setCategory] = useState('');



    const [offerPrice, setOfferPrice] = useState('');
    const [offerMessage, setOfferMessage] = useState('');
    const [Task_User_id, setTask_user_id] = useState('');
    const [Task_task_ID, setTask_task_ID] = useState('');



    let tasks = props.tasks;
    const handleSearch = () => {
        if (category === '') {
            props.getLatestTasks()
        } else {
            props.getFilteredTasks(category)
        }
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
        props.sendOffer(offer)
    }
    return (
        <div className='root'>
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
                            <p>{category}</p>
                            <KeyboardArrowDownIcon />
                        </div>
                    </div>
                    {openTab && <div className="optionsWrapper">
                        <div className="options">
                            <button className="closeSearch" onClick={() => {
                                setOpenTab(false)
                            }}>x</button>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Dom')
                            }} >Dom</div>

                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Ciscenje')
                            }}>Ciscenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Elektricar')
                            }}>Elektricar</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Vodoinstalater')
                            }}>Vodoinstalater</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Moler')
                            }}>Moler</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Bastovan')
                            }}>Bastovan</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Razno')
                            }}>Razno</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Lepota')
                            }} >Lepota</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Frizer')
                            }}>Frizer</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sminker')
                            }}>Sminker</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Nokti')
                            }}>Nokti</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Masaza')
                            }}>Masaza</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Zivotinje')
                            }} >Zivotinje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Groomer')
                            }}>Groomer</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Cuvar')
                            }}>Cuvar</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Poljoprivreda')
                            }} >Poljoprivreda</div>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Tattoo')
                            }} >Tattoo</div>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Muzika')
                            }} >Muzika</div>

                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Moda')
                            }} >Moda</div>
                            <div className="optionItems " onClick={() => {
                                setOpenTab(false)
                                setCategory('Ciscenje')
                            }} >Ciscenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sivenje')
                            }} >Sivenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sister')
                            }} >Sister</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Auto/Moto')
                            }} >Auto/Moto</div>
                        </div>
                    </div>}


                    <button className="searchButtons" onClick={() => {
                        handleSearch()
                    }}>SEARCH</button>
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
                                <div> {item.taskDescription ? <p>{item.taskDescription.substring(0, 100)}<span> ...Vise u Detaljima</span></p> : null}</div>

                            </div>
                            <div className='taskCardInfo2'>
                                <p className='taskCardItem hour'>Postovano <span>{item.taskCreated_at}</span> </p>
                            </div>
                            <div className='taskCardAction'>
                                <FavoriteIcon className='taskActionBtn' onClick={() => {
                                    console.log('add to favorite');
                                }} />
                                <Link to='/task/:id' className='taskActionBtn applyBtn'>DETALJNIJE</Link>

                                <button className='taskActionBtn applyBtn' onClick={() => {
                                    setModal(true)
                                    setTask_user_id(item.User_id)
                                    setTask_task_ID(item.task_ID)


                                }}>APLICIRAJ</button>
                            </div>
                        </div>
                    </div>
                )) : <div className="noUser">
                        <p>Trenutno nema novih poslova</p>
                    </div>}
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
        getFilteredTasks: (category) => dispatch(actionCreator.getFilteredTasks(category)),
        sendOffer: (offer) => dispatch(actionCreator.sendOffer(offer))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)






























