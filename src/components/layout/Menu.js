import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { motion } from "framer-motion"
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { FiCheckCircle, FiClock, FiMapPin, FiUsers, FiHeart, FiSearch, FiTag, FiKey } from "react-icons/fi";

function Menu(props) {
    const [menuToggle, setMenuToggle] = useState(false);
    let isLoggedIn = props.authUser.id ? true : false;
    return (
        <div className='mainWrapper'>
            <div className="mainMenuContent">
                {menuToggle && <div className='mobileMenuWrapper'>
                    <div className="mobileMenu">
                        <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/'><HomeIcon /> Home</Link></div>
                        {isLoggedIn ? <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/UserDashboard'><PersonIcon /> Profil</Link></div> : null}
                        {isLoggedIn ? <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/tasks'><LibraryBooksIcon />  Tasks</Link></div> : null}
                        {isLoggedIn ? <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/services'><WorkIcon /> Services</Link></div> : null}
                        {isLoggedIn ? <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/logout'>Log out</Link></div> : <div onClick={() => setMenuToggle(false)} className='mobileMenuItemDiv'><Link className='mobileMenuItem' to='/login'>Login</Link></div>}
                        <div className="mobileMenuItemDiv" onClick={() => {
                            if (menuToggle === false) {
                                setMenuToggle(true)
                            } else {
                                setMenuToggle(false)
                            }
                        }}>
                            <h2 className="mobileMenuItem redColor">EXIT<ExitToAppIcon /></h2>
                        </div>
                    </div>
                </div>}
                <div className="topBarWrapper">
                    <motion.div className="logoWrap"
                        animate={{ x: 0, opacity: 1 }}
                        initial={{ x: -50, opacity: 0 }}
                        transition={{
                            delay: .5,
                            x: { type: "spring", stiffness: 150 },
                            default: { duration: .3 },
                        }}
                    >
                        <img className="logo" src="/images/zanatlijeLogo4.png" alt="logo" onClick={() => {
                            window.location.href = '/';
                        }} />
                    </motion.div>
                    <div className="menuBurger">
                        <MenuIcon onClick={() => {
                            if (menuToggle === false) {
                                setMenuToggle(true)
                            } else {
                                setMenuToggle(false)
                            }
                        }} />
                    </div>
                    <motion.div className="menuWrap"
                        animate={{ x: 0, opacity: 1 }}
                        initial={{ x: 50, opacity: 0 }}
                        transition={{
                            delay: 1,
                            x: { type: "spring", stiffness: 100 },
                            default: { duration: .5 },
                        }}>
                        {isLoggedIn === true && props.authUser.email === "nikola.dj.87@gmail.com" ? <Link className='menuLink' to='/GOD'>GOD</Link> : null}
                        <Link className='menuLink' to='/'>Početna</Link>

                        {isLoggedIn ? <Link className='menuLink' to='/services'>Zanatlije</Link> : null}
                        {isLoggedIn ? <Link className='menuLink' to='/tasks'>Posao</Link> : null}
                        <Link className='menuLink' to='/services'>O sajtu</Link>

                    </motion.div>
                    <div className='menuItemProfile'>
                        {isLoggedIn ? <Link className='menuLink' to='/UserDashboard'>
                            <div className='menuItemProfileLink'>
                                {props.authUser.avatar ? <img src={`http://localhost:3001/uploads/${props.authUser.avatar}`} alt="profile" className='menuItemPhoto' /> : <img src="./images/zanatlija.png" className='menuItemPhoto' alt="profile" />}

                                <p>{props.authUser.firstName}</p>
                            </div>
                        </Link> : <Link className='menuLink' to='/login'><FiKey /> Log in</Link>}


                    </div>
                </div>
            </div>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.User.authUser
    }
}
export default withRouter(connect(mapStateToProps, null)(Menu))
