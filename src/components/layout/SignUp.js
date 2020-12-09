import React from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as actionCreator from './Profile/User/store/userActions'



function Signup(props) {
  // BCRYPT PASSWORD
  let state = {
    firstName: '',
    email: '',
    password: '',
    credit: 30,
    like: 1,
    dislike: 1,
    userRank: 1,
    userVipStatus: 1,
    userType: 'korisnik',
    verified: false,
    created_at: '',
  }

  const handleSubmit = () => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let created_at = `${day}.${month}.${year}`
    state.created_at = created_at;
    props.createUser(state)
  }
  return (
    <div className='loginWrapper'>
      <div className='form'>
        <img className='loginAvatar' alt="Cindy Baker" src="lock.png" />
        <h3 className='loginTitle' >Sign up</h3>
        <div className='formItem'>
          <TextField fullWidth label="Name" variant="outlined" onChange={(e) => { state.firstName = e.target.value }} />
        </div>
        <div className='formItem'>
          <TextField fullWidth label="Email" variant="outlined" onChange={(e) => { state.email = e.target.value }} />
        </div>
        <div className='formItem'>
          <TextField fullWidth type="password" label="Password" variant="outlined" onChange={(e) => { state.password = e.target.value }} />
        </div>
        <div className='actions' >
          <Link className='linkBtn' to='/login'>I have an account</Link>
          <Link className='signupButton' to="/login" onClick={() => handleSubmit()}>SIGNUP</Link>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (state) => dispatch(actionCreator.createUser({ state }))
  }

}
export default connect(null, mapDispatchToProps)(Signup)





