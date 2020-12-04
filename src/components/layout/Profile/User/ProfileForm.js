import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux'
import * as actionCreator from './store/userActions'
import FormData from 'form-data'

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
                        <p className="confirmationSubtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type  </p>
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

            <h6 className='profileFormTitle'> UPDATE PROFILE</h6>
            <div className='formItem'>
                <input type="file" name="picture" onChange={(e) => {
                    e.preventDefault()
                    handleFile(e)
                    // state.avatar = e.target.files;
                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Ime" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.firstName = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Prezime" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.lastName = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Adresa" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.address = e.target.value

                }} />
            </div>
            <div className='formItem'>
                <TextField fullWidth label="Email" variant="outlined" onChange={(e) => {
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
                <TextField multiline fullWidth label="O meni" variant="outlined" onChange={(e) => {
                    e.preventDefault()
                    state.aboutMe = e.target.value

                }} />
            </div>

            <div className="formActionsWrap">
                <p className='UserFormBtn formAdd' onClick={() => {
                    handleSubmit()
                }}><SaveIcon /></p>
                <p className='UserFormBtn formDelete' onClick={() => {

                    setConfirm(true)
                }}><DeleteForeverIcon /></p>
            </div>
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
        deleteUser: (state) => dispatch(actionCreator.deleteUser(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)



// console.log(e.target.files[0]);
        // const formData = new FormData();
        // formData.append("picture", e.target.files[0])

        // let res = await Axios.post("http://localhost:3001/picture", {
        //     body: formData
        // }).then(res = res.json())
        // alert(JSON.stringify(res))