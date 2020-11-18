import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import * as actionCreator from '../User/store/userActions'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

function ServiceForm(props) {
    const [openTab, setOpenTab] = useState(false)
    const [serviceCategory, setServiceCategory] = useState('Razno')
    const [servicePrice, setServicePrice] = useState(0)
    const [serviceDescription, setServiceDescription] = useState('Opis nije dodat')
    const handleSubmit = () => {
        let state = {
            serviceCategory, servicePrice, serviceDescription, User_id: props.authUser.id
        }
        props.createNewService(state)
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
                {openTab && <div className="optionsWrapper">
                    <div className="options">
                        <button onClick={() => {
                            setOpenTab(false)
                        }}>x</button>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Dom')
                        }} >Dom</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Ciscenje')
                        }}>Ciscenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Elektricar')
                        }}>Elektricar</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Vodoinstalater')
                        }}>Vodoinstalater</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Moler')
                        }}>Moler</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Bastovan')
                        }}>Bastovan</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Razno')
                        }}>Razno</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Lepota')
                        }} >Lepota</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Frizer')
                        }}>Frizer</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Sminker')
                        }}>Sminker</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Nokti')
                        }}>Nokti</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Masaza')
                        }}>Masaza</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Zivotinje')
                        }} >Zivotinje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Groomer')
                        }}>Groomer</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Cuvar')
                        }}>Cuvar</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Poljoprivreda')
                        }} >Poljoprivreda</div>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Tattoo')
                        }} >Tattoo</div>
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Muzika')
                        }} >Muzika</div>

                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Moda')
                        }} >Moda</div>
                        <div className="optionItems " onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Ciscenje')
                        }} >Ciscenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Sivenje')
                        }} >Sivenje</div>
                        <div className="optionItems" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Sister')
                        }} >Sister</div>
                        {/* *********************  */}
                        <div className="optionItems optionItemMain" onClick={() => {
                            setOpenTab(false)
                            setServiceCategory('Auto/Moto')
                        }} >Auto/Moto</div>
                    </div>
                </div>}
            </div>

            <div className='formItem'>
                <TextField fullWidth label="Cena" variant="outlined" onChange={(e) => {
                    setServicePrice(e.target.value)
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth multiline label="Opis" variant="outlined" onChange={(e) => {
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
