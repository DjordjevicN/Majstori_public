import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import options from '../../../OptionsData'
function ServiceForm(props) {
    const [openTab, setOpenTab] = useState(false)
    const [serviceCategory, setServiceCategory] = useState('Izaberi Kategoriju')
    const [servicePrice, setServicePrice] = useState(0)
    const [serviceDescription, setServiceDescription] = useState('Opis nije dodat')
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
        let state = {
            serviceCategory, servicePrice, serviceDescription, User_id: props.authUser.id
        }
        if (props.services.length < 20) {
            props.createNewService(state)
        } else {
            console.log('VISE OD 20');
        }
    }
    return (
        <div className='profileFormWrapper'>

            <h6 className='profileFormTitle'>DODAJ USLUGU</h6>
            <div className='formItem '>
                <div className="selectFormWrapper">
                    <div className="serviceOptionsTab" onClick={() => {
                        if (openTab) {
                            setOpenTab(false)
                        } else {
                            setOpenTab(true)
                        }
                    }} >
                        <p>{serviceCategory}</p>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {openTab ? <div className="optionsWrapper">
                    <div className="options" ref={menuRef}>
                        {options.map((item) => {
                            if (item.main) {
                                return <div key={item.id} className="optionItems optionItemMain" onClick={() => {
                                    setServiceCategory(item.value)
                                    setOpenTab(false)
                                }} >{item.title}</div>
                            }
                            return <div key={item.id} className="optionItems " onClick={() => {
                                setServiceCategory(item.value)
                                setOpenTab(false)
                            }} >{item.title}</div>
                        })}
                    </div>
                </div> : <div ref={menuRef}></div>}
            </div>

            <div className='formItem'>
                <TextField fullWidth label="Cena" placeholder="Prazno polje ce biti upisano kao 'Kontakt'" variant="outlined" onChange={(e) => {
                    setServicePrice(e.target.value)
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth multiline label="Opis" placeholder="Napisite opis usluge" variant="outlined" onChange={(e) => {
                    setServiceDescription(e.target.value)
                }} />
            </div>
            <p className='servicesFormBtn' onClick={() => {
                handleSubmit()
            }}>+DODAJ</p>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        services: state.User.myServices,
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createNewService: (state) => dispatch(actionCreator.createNewService(state)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm)
