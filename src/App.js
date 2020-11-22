import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionCreator from './components/layout/Profile/User/store/userActions'

import './App.css';
import './CSS/mainMenu.css';
import './components/layout/Home/Home.css';
import './components/layout/Tasks/Tasks.css';
import './components/layout/Profile/UserTasks/UserTasks.css'
import './components/layout/Footer.css';
import './components/layout/Services/Services.css';
import './components/layout/Profile/UserServices/UserServices.css'
import './components/layout/Profile/User/User.css';
import './components/layout/Profile/UserOffers/UserOffer.css';
import './components/layout/Profile/UserProposals/UserProposals.css';
import './components/layout/News/News.css';
import './components/layout/GOD/AdminDashboard.css'
import './components/layout/Profile/UserProfile.css'
import './CSS/Signup.css';
import './CSS/Dashboard.css';
import './CSS/form.css';
import './CSS/selectForm.css';

import Menu from './components/layout/Menu'
import Home from './components/layout/Home/Home'
import Tasks from './components/layout/Tasks/Tasks'
import Task from './components/layout/Tasks/Task'
import Services from './components/layout/Services/Services'
import SignUp from './components/layout/SignUp'
import Login from './components/layout/Login'

import UserDashboard from './components/layout/Profile/UserDashboard'
import AdminDashboard from './components/layout/GOD/AdminDashboard'
import UserProfile from './components/layout/Profile/UserProfile'


function App(props) {
  useEffect(() => {
    const checkIfLoggedIn = () => {
      if (localStorage.getItem('authUser')) {
        let storage = JSON.parse(localStorage.getItem('authUser'))
        let email = storage.email;
        let password = storage.password
        props.loginUser(email, password)
      }
    }
    checkIfLoggedIn()
    return
    /* eslint-disable-next-line */
  }, []);
  return (

    <BrowserRouter>
      <div className="App">
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/services' component={Services} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/UserProfile/:id' component={UserProfile} />
          <Route path='/Task/:id' component={Task} />
          <Route path='/UserDashboard' component={UserDashboard} />
          <Route path='/GOD' component={AdminDashboard} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    loginUser: (email, password) => dispatch(actionCreator.loginUser({ email, password }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
