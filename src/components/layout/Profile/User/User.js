import React from 'react';
import * as actionCreator from './store/userActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function User(props) {


    let authUser = props.authUser
    return (
        <div className="profileDashWrapper">

            <div className="profileDashCard">
                <div className="profileInformationDash">
                    <div className="dashImageWrap">
                        <img src={`http://localhost:3001/uploads/${authUser.avatar}`} alt="profile" className="dashImage" />
                    </div>
                    <div className="dashInformationBlock">
                        {authUser.firstName === '' ? <h3 className="profileDashName">{authUser.email}</h3> : <h3 className="profileDashName">{`${authUser.firstName} ${authUser.lastName}`}</h3>}
                        <div className="dashSmallInfo">
                            <p className="doneJobs"> Zavrsenih poslova -  {authUser.completedTasks}</p>
                            <p className="UserEmail UserItem">Email: <span>{authUser.email}</span> </p>
                            <p className="UserPhone UserItem">Telefon: <span>{authUser.phoneNumber}</span> </p>
                            <p className="UserCredit UserItem">Kredit: <span>{authUser.credit}</span> </p>
                            <p className="UserUpdatedAt UserItem">Updated:  <span>{authUser.updated_at}</span></p>
                            <p className="UserCreatedAt UserItem">Created: <span>{authUser.created_at}</span></p>
                            <div className='logoutUserDiv'>
                                <p onClick={() => {
                                    props.logoutUser()
                                }}><Link className='logoutUser' to="/">LOGOUT</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomDashInformation">
                    <h3>O Meni</h3>
                    <p>{authUser.aboutMe}</p>
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
        logoutUser: () => dispatch(actionCreator.logoutUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);

