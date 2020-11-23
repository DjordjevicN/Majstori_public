import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import * as globeActionCreator from '../../../../store/actions/actions'
import options from '../../../OptionsData'
function ProfileForm(props) {
    const [confirm, setConfirm] = useState(false)
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
    let menuRef = useRef()
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
            taskLatitude: 0,
            taskLongitude: 0,
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

            {confirm ? <div className="confirmation">
                <div className="confirmationContent">
                    <div className="confirmationTop">
                        <h4 className="confirmationTitle">Kreiraj novi task ?</h4>
                        <p className="confirmationSubtitle">Cena kreiranja taska je 1 kredit. Preostali kredit na vasem racunu: {props.authUser.credit}. Svakog prvog u mesecu mozete besplatno da dodate 30 kredita</p>
                    </div>
                    <div className="confirmationAction">
                        <p onClick={() => {
                            handleSubmit()
                            setConfirm(false)
                        }} >DA</p>
                        <p onClick={() => {
                            setConfirm(false)
                        }} >NE</p>
                    </div>
                </div>
            </div> : null}

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
                {openTab ? <div className="optionsWrapper">
                    <div className="options" ref={menuRef}>
                        {options.map((item) => {
                            if (item.main) {
                                return <div key={item.id} className="optionItems optionItemMain" onClick={() => {
                                    setTaskCategory(item.value)
                                    setOpenTab(false)
                                }} >{item.title}</div>
                            }
                            return <div key={item.id} className="optionItems " onClick={() => {
                                setTaskCategory(item.value)
                                setOpenTab(false)
                            }} >{item.title}</div>
                        })}
                    </div>
                </div> : <div ref={menuRef}></div>}

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
                setConfirm(true)
            }}>+DODAJ</p>
            <p className='addTaskTUT'>Cena kreiranja taska je 1 kredit. Preostali kredit na vasem racunu: {props.authUser.credit}. Svakog prvog u mesecu mozete besplatno da dodate 30 kredita OVDE</p>
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