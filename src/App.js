import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionCreator from './components/layout/Profile/User/store/userActions'
import * as globalActionCreator from './store/actions/actions'
// SCC
import 'react-notifications-component/dist/theme.css'
import './App.css';
import './CSS/mainMenu.css';
import './components/layout/Home/Home.css';
import './components/layout/Tasks/Tasks.css';
import './components/layout/Profile/UserTasks/UserTasks.css'
import './components/layout/Footer.css';
import './components/layout/Services/Services.css';
import './components/layout/Profile/UserServices/UserServices.css'
import './components/layout/Profile/User/UserPreview.css';
import './components/layout/Profile/UserOffers/UserOffer.css';
import './components/layout/Profile/UserProposals/UserProposals.css';
import './components/layout/News/News.css';
import './components/layout/GOD/AdminDashboard.css'
import './components/layout/Profile/UserProfile.css'
import './components/layout/Profile/Shop/Shop.css'
import './components/layout/Profile/FavoritePage/FavoritePage.css'
import './CSS/Signup.css';
import './CSS/Dashboard.css';
import './CSS/form.css';
import './CSS/selectForm.css';

// PAGES
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
// import Footer from './components/layout/Footer'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'
// import { NotificationContainer, NotificationManager } from 'react-notifications';
function App(props) {
  useEffect(() => {
    props.getMyData()
    props.getAllTasks()

    return
    /* eslint-disable-next-line */
  }, []);
  return (

    <BrowserRouter>
      <div className="App">
        <ReactNotification />
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/services' component={Services} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/userProfile/:id' component={UserProfile} />
          <Route path='/Task/:id' component={Task} />
          <Route path='/UserDashboard' component={UserDashboard} />
          <Route path='/GOD' component={AdminDashboard} />
        </Switch>
        {/* <Footer /> */}
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

    loginUser: (email, password) => dispatch(actionCreator.loginUser({ email, password })),
    getMyData: () => dispatch(actionCreator.getMyData()),
    getAllTasks: () => dispatch(globalActionCreator.getAllTasks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
