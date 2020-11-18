import React from 'react';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as actionCreator from '../Profile/User/store/userActions'


function HomeSignup(props) {
    // BCRYPT PASSWORD
    let state = {
        firstName: '',
        email: '',
        password: '',
        credit: 30,
        taskerRank: 1,
        like: 1,
        dislike: 1,
        taskerVipStatus: 'vip1',
        tasker: true,
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
        <div className='HomeSignupWrapper'>
            <div className='HomeSignupForm'>

                <h3 className='HomeSignupTitle'>Prijava</h3>
                <div className='formItem'>
                    <TextField fullWidth label="Ime" variant="outlined" onChange={(e) => { state.firstName = e.target.value }} />
                </div>
                <div className='formItem'>
                    <TextField fullWidth label="Email" variant="outlined" onChange={(e) => { state.email = e.target.value }} />
                </div>
                <div className='formItem'>
                    <TextField fullWidth type="password" label="Password" variant="outlined" onChange={(e) => { state.password = e.target.value }} />
                </div>
                <div className='actions' >
                    <Link className='HomeSignupLinkBtn' to='/login'>Imam nalog</Link>
                    <button className="buttonCTA" onClick={() => handleSubmit()} > <Link className="buttonCTALink" to="/login">PRIJAVI SE</Link></button>
                </div>
                <div className="signupLegal">
                    <p>Prihatam <Link to="/">Uslove koriscenja</Link> i <Link to="/">Uslove Privatnosti</Link></p>
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
export default connect(null, mapDispatchToProps)(HomeSignup)





