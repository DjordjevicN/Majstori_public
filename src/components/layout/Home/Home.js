import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiCheckCircle, FiClock, FiMapPin, FiUsers } from "react-icons/fi";
// FiHeart, FiSearch, FiTag, FiKey,
import Footer from '../Footer'
function Home(props) {
    let isLoggedIn = props.authUser.id ? true : false;

    return (
        <div className='homeMainWrapper'>


            <div className="homeContent">
                <div className="homeHero">
                    <div className="homeHeroTitle">
                        <h1>Najlaksi nacin da pronadjete novi posao</h1>
                        <h4>Pronadji posao, zantatliju ili postavi posao</h4>
                        {isLoggedIn ? <p className='homeCTABtn'> <Link className='link' to='/tasks'>Trazi</Link></p> : <p className='homeCTABtn'><Link className='link' to='/tasks'>Uloguj se</Link></p>}
                    </div>
                </div>
                <div className="newTasksWrapper">
                    <div className="newTasksContent">
                        <div className="contentWrap">
                            <div className="newTasksTitle">
                                <h2>NOVI POSLOVI</h2>
                                <p>Ovde izlaze novi poslovi svakoga sata</p>
                            </div>
                            <div className="newTasksCard">
                                <div className="newTasksCorner">
                                    <img className="newTasksCornerImage" src="./images/taskerRank1.png" alt="" />
                                </div>
                                <div className="newTasksCardContent">
                                    <div className="newTasksUser">
                                        <FiCheckCircle className="newTasksUserIcon" />
                                        <p>Tamara Bosak</p>
                                    </div>
                                    <div className="homeTaskTitle">
                                        <h2>Treba mi majstor za sijalice</h2>
                                        <p> simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </p>
                                    </div>
                                    <div className="newTasksInfo">
                                        <div className="userType newTasksInfoDetails">
                                            <FiUsers className="userTypeIcon" />
                                            <p>User type</p>
                                        </div>
                                        <div className="tasksTown newTasksInfoDetails">
                                            <FiMapPin className="tasksTownIcon" />
                                            <p>Town</p>
                                        </div>
                                        <div className="tasksTime newTasksInfoDetails">
                                            <FiClock className="tasksTimeIcon" />
                                            <p>23.2.2020</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cardActionWrap">
                                    <p className='newTasksCTA'><Link className='link' to='/task/:id'>Detaljnije</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="howClientWrapper">
                    <div className="howClientContent">
                        <div className="howClientTitle">
                            <h2>KAO KLIJENT</h2>
                            <p>Kreiraj nalog kao zanatlija ili kao klijent. Kao zanatlije mozes da postavljas
poslove i da ocekujes ponude od zanatlija ili da direktno trazis zanatliju po profilima.</p>
                        </div>
                        <div className="howClientCards">
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/client.png" alt="" />
                                <h4>Napravi nalog</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry. </p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/createJob.png" alt="" />
                                <h4>Kreiraj posao</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry.  </p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/hire.png" alt="" />
                                <h4>Zaposli zanatliju</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bannerSplit">
                    <div className="left">
                        <div className="leftContent">
                            <h2 className="leftTitle">Napravi nalog</h2>
                            <p>s simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard
 dummy text ever since the 1500s, when </p>
                            <p className="bannerSplitCTA">Napravi nalog</p>
                        </div>

                    </div>
                    <div className="right">
                        <div className="rightContent">
                            <h2 className="rightTitle">Napravi nalog</h2>
                            <p>s simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard
 dummy text ever since the 1500s, when </p>
                            <p className="bannerSplitCTA">Napravi nalog</p>
                        </div>
                    </div>
                </div>
                <div className="howClientWrapper">
                    <div className="howClientContent">
                        <div className="howClientTitle">
                            <h2>KAO ZANATLIJA</h2>
                            <p>Kreiraj nalog kao zanatlija i moses da ponudis svoje usluge i da cekas poziv ili da bidujes na poslilve</p>
                        </div>
                        <div className="howClientCards">
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/zanatlija.png" alt="" />
                                <h4>Napravi nalog</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry. </p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/findJob.png" alt="" />
                                <h4>Kreiraj posao</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry.  </p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/apply.png" alt="" />
                                <h4>Zaposli zanatliju</h4>
                                <p>s simply dummy text of the printing and typesetting
                                industry. </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>

    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.User.authUser
    }
}
export default connect(mapStateToProps, null)(Home);
