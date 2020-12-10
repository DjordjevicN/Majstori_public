import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiTag } from "react-icons/fi";
import { FcApproval } from "react-icons/fc";
import Footer from '../Footer'
import * as actionCreator from '../../../store/actions/actions'
import { motion, AnimatePresence } from 'framer-motion'
function Home(props) {
    let isLoggedIn = props.authUser.id ? true : false;

    return (
        <div className='homeMainWrapper'>
            <div className="homeContent">
                <div className="homeHero">
                    <AnimatePresence>
                        <div className="homeHeroTitle">
                            <motion.h1 initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: .3, delay: 1 }}>,,Hej, da li poznaješ nekog...?’’</motion.h1>
                            <motion.h4 initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: .3, delay: 1.2 }}>Majstora? Frizera? Mi ih znamo sve!
                        Istraži bazu podataka ili oglasi novi posao za koji ti je potreban zanatlija.</motion.h4>
                            <motion.div initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: .3, delay: 1.5 }}>

                                {isLoggedIn ? <p className='homeCTABtn'> <Link className='link' to='/tasks'>Istraži</Link></p> : <p className='homeCTABtn'><Link className='link' to='/login'>Uloguj se</Link></p>}


                            </motion.div>
                        </div>
                    </AnimatePresence>
                </div>
                <div className="newTasksWrapper">
                    <div className="newTasksContent">
                        <div className="contentWrap">
                            <div className="newTasksTitle">
                                <h2>NOVI POSLOVI</h2>
                                <p>Oglasi se ažuriraju svakoga sata.</p>
                            </div>
                            {props.homeTasks && <div>
                                <AnimatePresence initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: .3, delay: 1.5 }}>
                                    {props.homeTasks.map((item) => (
                                        <motion.div className="newTasksCard" key={item.task_ID}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: .3, delay: 1.5 }}>
                                            <div className="newTasksCorner">
                                                <img className="newTasksCornerImage" src={`./images/taskerRank1.png`} alt="" />
                                            </div>
                                            <div className="newTasksCardContent">
                                                <div className="newTasksUser">
                                                    <p>{item.firstName}</p>
                                                    <FcApproval className="newTasksUserIcon" />
                                                </div>
                                                <div className="homeTaskTitle">
                                                    <h2>{item.taskTitle}</h2>
                                                    <div> {item.taskDescription ? <p>{item.taskDescription.substring(0, 100)}<span> ...</span></p> : null}</div>
                                                </div>
                                                <div className="newTasksInfo">
                                                    <div className="homeTaskPrice newTasksInfoDetails">
                                                        <FiTag className="homeTaskPriceIcon" />
                                                        {item.taskPrice > 0 ? <p>{item.taskPrice}</p> : <p>Kontakt</p>}
                                                    </div>
                                                    <div className="tasksTown newTasksInfoDetails">
                                                        <FiMapPin className="tasksTownIcon" />
                                                        <p>GRAD</p>
                                                    </div>
                                                    <div className="tasksTime newTasksInfoDetails">
                                                        <FiClock className="tasksTimeIcon" />
                                                        <p>{item.taskStartDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cardActionWrap">
                                                <p className='newTasksCTA' onClick={() => {
                                                    props.getTaskById(item.task_ID)
                                                }}><Link className='link' to={`/task/${item.task_ID}`}>Detaljnije</Link></p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="howClientWrapper">
                    <div className="howClientContent">
                        <div className="howClientTitle">
                            <h2>KORISNICI</h2>
                            <p>Kreiraj nalog kao zanatlija ili kao korisnik.
                                Naši korisnici oglašavaju poslove i biraju najbolju ponudu naših zanatlija ili direktno kontaktiraju zanatlije pretražujući njihove profile.</p>
                        </div>
                        <div className="howClientCards">
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/client.png" alt="" />
                                <h4>Napravi profil</h4>
                                <p>Važno nam je da te upoznamo</p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/createJob.png" alt="" />
                                <h4>Oglasi posao</h4>
                                <p>Od zamene sijalice do nove frizure kućnog ljubimca: naše zanatlije su tu da ti pomognu!</p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/hire.png" alt="" />
                                <h4>Angažuj zanatliju</h4>
                                <p>Pronađi profil osobe čije usluge su ti potrebne!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bannerSplit">
                    <div className="left">
                        <div className="leftContent">
                            <h2 className="leftTitle">Otvori nalog kao korisnik</h2>
                            <Link to="/signup" className="bannerSplitCTA">Korisnik</Link>

                        </div>
                    </div>
                    <div className="right">
                        <div className="rightContent">
                            <h2 className="rightTitle">Otvori nalog kao zanatlija</h2>

                            <Link to="/signup" className="bannerSplitCTA">Zanatlija</Link>
                        </div>
                    </div>
                </div>
                <div className="howClientWrapper">
                    <div className="howClientContent">
                        <div className="howClientTitle">
                            <h2>KAO ZANATLIJA</h2>
                            <p>Kreiraj nalog kao zanatlija ili kao korisnik.
                                    Naše zanatlije kreiraju svoje profile i mogu da šalju ponude za oglašene poslove. </p>
                        </div>
                        <div className="howClientCards">
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/zanatlija.png" alt="" />
                                <h4>Napravi profil</h4>
                                <p>Pokaži šta znaš</p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/findJob.png" alt="" />
                                <h4>Pronađi posao</h4>
                                <p>Od šetnje ljubimca do renoviranja stana: sigurno ćeš naći nešto za sebe!</p>
                            </div>
                            <div className="howClientCard">
                                <img className="howClientCardImage" src="./images/apply.png" alt="" />
                                <h4>Pošalji ponudu</h4>
                                <p>Najbolji zanatlija po izboru korisnika dobija posao!</p>
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
        authUser: state.User.authUser,
        homeTasks: state.globalReducer.homePageTasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getTaskById: (id) => dispatch(actionCreator.getTaskById(id))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
