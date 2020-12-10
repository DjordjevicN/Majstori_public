import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux'
import * as actionCreator from './store/userActions'
import FormData from 'form-data'
import { Link } from 'react-router-dom'

function ProfileForm(props) {
    const [confirm, setConfirm] = useState(false)
    let isLoggedIn = props.authUser.id ? true : false;
    if (!isLoggedIn) { return <Redirect to='/' /> }
    let state = props.authUser;
    const handleFile = async (e) => {
        const formData = new FormData()
        formData.append("picture", e.target.files[0])
        formData.append('userId', props.authUser.id)
        await fetch("http://localhost:3001/picture", {
            method: "POST",
            body: formData
        }).then(res => res.json())
    }
    const handleSubmit = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let updated_at = `${day}.${month}.${year}`
        state.updated_at = updated_at;
        props.updateUser(state)
    }
    const handleDelete = async () => {
        props.deleteUser(state)
    }

    return (
        <div className='profileFormWrapper'>
            {confirm ? <div className="confirmation">
                <div className="confirmationContent">
                    <div className="confirmationTop">
                        <h4 className="confirmationTitle">Obrisi nalog ?</h4>
                        <p className="confirmationSubtitle">
                            Trajno obrisi profil, kao i sve poruke, poslove, aplikacije.
                        </p>
                    </div>
                    <div className="confirmationAction">
                        <p onClick={() => {
                            handleDelete()
                            setConfirm(false)
                        }} >DA</p>
                        <p onClick={() => {
                            setConfirm(false)
                        }} >NE</p>
                    </div>
                </div>
            </div> : null}

            <h4 className='profileFormTitle'>AŽURIRAJ PROFIL</h4>
            <div className='formItem formSelect'>
                <p>Izaberi tip profila</p>
                <select className="formItemSelect" onChange={(e) => {
                    state.userType = e.target.value
                }}>
                    <option value="korisnik">Korisnik</option>
                    <option value="zanatlija">Zanatlija</option>
                </select>

            </div>
            <div className='formItem profileFormAvatarBox'>
                <p>Profilna slika</p>
                <input className='profileFormAvatar' type="file" name="picture" onChange={(e) => {
                    e.preventDefault()
                    handleFile(e)
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Ime" placeholder="Ime koje ce biti vidljivo drugim korisnicima" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.firstName = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Adresa" variant="outlined" placeholder="Adresa koja ce biti vidljiva drugim korisnicima" onChange={(e) => {
                    e.preventDefault()
                    state.address = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Email" variant="outlined" placeholder="Email adresa koju koristite da se ulogujete nasajt" onChange={(e) => {
                    e.preventDefault()
                    state.email = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Broj Telefona" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.phoneNumber = e.target.value
                }} />
            </div>
            <div className='formItem'>
                <TextField multiline fullWidth label="O meni" variant="outlined" placeholder="Napisite kratak opis o sebi i uslugama koje nudite" onChange={(e) => {
                    e.preventDefault()
                    state.aboutMe = e.target.value

                }} />
            </div>

            <div className="formActionsWrap">

                <div className='UserFormBtn formAdd' onClick={() => {
                    handleSubmit()
                }}><SaveIcon />
                    <p>Sačuvaj</p></div>
                <p className='UserFormBtn formDelete' onClick={() => {
                    setConfirm(true)
                }}>Obriši profil</p>
            </div>
            <Link className='logoutBTN' to='/' onClick={() => {
                props.logoutUser()
            }} >Log out</Link>
        </div>

    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.User.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (state) => dispatch(actionCreator.updateUser(state)),
        deleteUser: (state) => dispatch(actionCreator.deleteUser(state)),
        logoutUser: () => dispatch(actionCreator.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)





