import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import * as globeActionCreator from '../../../../store/actions/actions'


function ProfileForm(props) {
    const [openTab, setOpenTab] = useState(false)
    const [taskCategory, setTaskCategory] = useState('Razno')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskPrice, setTaskPrice] = useState(0)
    const [taskAddress, setTaskAddress] = useState('')
    const [taskDescription, setTaskDescription] = useState('Opis nije dodat')
    const [taskStartTime, setTaskStartTime] = useState('')
    const [taskEndTime, setTaskEndTime] = useState('')
    const [taskStartDate, setTaskStartDate] = useState('')
    const [taskEndDate, setTaskEndDate] = useState('')

    const handleSubmit = () => {

        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let taskCreated_at = `${day}.${month}.${year}`

        let state = {
            taskCategory,
            taskTitle,
            taskPrice,
            taskDescription,
            taskAddress,
            taskStartTime,
            taskEndTime,
            taskStartDate,
            taskEndDate,
            taskCreated_at,
            User_id: props.authUser.id
        }

        if (props.authUser.credit >= 0) {
            let usersCredit = {
                credit: props.authUser.credit,
                userId: props.authUser.id
            }
            props.deductCredit(usersCredit)
            props.createTask(state)
        }
    }
    return (
        <div className='profileFormWrapper'>
            <h6 className='profileFormTitle'>KREIRAJ NOVI TASK</h6>
            <div className='formItem'>
                <TextField fullWidth label="Naslov" variant="outlined" onChange={(e) => {
                    setTaskTitle(e.target.value)
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Adresa" variant="outlined" onChange={(e) => {
                    setTaskAddress(e.target.value)
                }} />
            </div>
            <div className='formItem '>
                <div className="selectFormWrapper">
                    <div className="taskSelectTab" onClick={() => {
                        if (openTab) {
                            setOpenTab(false)
                        } else {
                            setOpenTab(true)
                        }
                    }} >
                        <p>{taskCategory}</p>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {openTab && <div className="optionsWrapper">
                    <div className="options">
                        <button onClick={() => {
                            setOpenTab(false)
                        }}>x</button>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Dom')
                        }} >Dom</div>

                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Ciscenje')
                        }}>Ciscenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Elektricar')
                        }}>Elektricar</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Vodoinstalater')
                        }}>Vodoinstalater</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Moler')
                        }}>Moler</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Bastovan')
                        }}>Bastovan</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Razno')
                        }}>Razno</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Lepota')
                        }} >Lepota</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Frizer')
                        }}>Frizer</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Sminker')
                        }}>Sminker</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Nokti')
                        }}>Nokti</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Masaza')
                        }}>Masaza</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Zivotinje')
                        }} >Zivotinje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Groomer')
                        }}>Groomer</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Cuvar')
                        }}>Cuvar</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Poljoprivreda')
                        }} >Poljoprivreda</div>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Tattoo')
                        }} >Tattoo</div>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Muzika')
                        }} >Muzika</div>

                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Moda')
                        }} >Moda</div>
                        <div className="optionItems " onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Ciscenje')
                        }} >Ciscenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Sivenje')
                        }} >Sivenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Sister')
                        }} >Sister</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setTaskCategory('Auto/Moto')
                        }} >Auto/Moto</div>
                    </div>
                </div>}

            </div>
            <div className='formItem'>
                <TextField fullWidth label="Cena" variant="outlined" onChange={(e) => {
                    setTaskPrice(e.target.value)
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth multiline label="Opis" variant="outlined" onChange={(e) => {
                    setTaskDescription(e.target.value)
                }} />
            </div>
            <div className='formItem'>
                <TextField
                    id="date"
                    label="Datum pocetka"
                    type="date"
                    defaultValue="2020-10-24"

                    onChange={(e) => {
                        setTaskStartDate(e.target.value)
                    }}
                />
            </div>
            <div className='formItem'>
                <TextField
                    id="time"
                    label="Pocetno Vreme"
                    type="time"
                    defaultValue="07:30"
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    onChange={(e) => {
                        setTaskStartTime(e.target.value)
                    }}
                />
            </div>
            <div className='formItem'>
                <TextField
                    id="date"
                    label="Datum zavrsetka"
                    type="date"
                    defaultValue="2020-10-24"

                    onChange={(e) => {
                        setTaskEndDate(e.target.value)
                    }}
                />
            </div>

            <div className='formItem'>
                <TextField
                    id="time"
                    label="Zavrsno Vreme"
                    type="time"
                    defaultValue="07:30"
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    onChange={(e) => {
                        setTaskEndTime(e.target.value)
                    }}
                />
            </div>
            <p className='servicesFormBtn' onClick={() => {
                handleSubmit()
            }}>+DODAJ</p>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        tasks: state.User.myTasks,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (state) => dispatch(actionCreator.createTask(state)),
        deductCredit: (usersCredit) => dispatch(globeActionCreator.deductCredit(usersCredit))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)