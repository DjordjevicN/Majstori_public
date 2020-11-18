import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import * as actionCreator from './Profile/User/store/userActions'



function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Redirect to Profile
  let isLoggedIn = props.authUser.id ? true : false;
  if (isLoggedIn) { return <Redirect to='/UserDashboard' /> }
  if (isLoggedIn) { console.log('dddd'); }
  const handleSubmit = () => {
    props.loginUser(email, password)
  }
  return (
    <div className='loginWrapper'>
      <div className='form'>
        <img className='loginAvatar' alt="Cindy Baker" src="lock.png" />
        <h3 className='loginTitle'>Login</h3>
        <div className='formItem'>
          <TextField fullWidth label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className='formItem'>
          <TextField fullWidth type='password' label="Password" variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
        </div>

        <button onClick={() => handleSubmit()} className='formButtonLogin'>LOG IN</button>


        <div className='actions' >
          {/* <Link to='/' >Reset password</Link> */}
          <Link to="/signup">Don't have account</Link>
        </div>
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
    loginUser: (email, password) => dispatch(actionCreator.loginUser({ email, password }))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)


