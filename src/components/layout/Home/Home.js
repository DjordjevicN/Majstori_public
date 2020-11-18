import React from 'react';
import HomeSignup from './HomeSignup';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import { GiClawHammer } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { IoMdLaptop } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa";
import { RiFindReplaceLine } from "react-icons/ri";
import { connect } from 'react-redux'

function Home(props) {
    return (
        <div className='homeMainWrapper'>
            <div className="homeHeroWrapper">
                <motion.div className="homeHeroTitle" animate={{ x: 0, opacity: 1 }}
                    initial={{ x: 50, opacity: 0 }}
                    transition={{
                        delay: .8,
                        x: { type: "spring", stiffness: 150 },
                        default: { duration: .3 },
                    }}>
                    <h1>Work. Life. Balanced</h1>
                </motion.div>
                <motion.div className="HomeSignupWrapper" animate={{ x: 0, opacity: 1 }}
                    initial={{ x: 50, opacity: 0 }}
                    transition={{
                        delay: .5,
                        x: { type: "spring", stiffness: 150 },
                        default: { duration: .3 },
                    }}>
                    {props.authUser.id ? null : <HomeSignup />}
                </motion.div>
            </div>
            <div className="homePromisesWrapper">
                <div className='homePromisesContent'>
                    <h1 className="homePromisesTitle">
                        Work with us
                    </h1>
                    <div className="homePromisesItems">
                        <div className="homePromisesItem">
                            <div>
                                <GiClawHammer className='homePromisesItemIcon' />
                                <h4>Find Job You Love</h4>
                            </div>
                        </div>
                        <div className="homePromisesItem">
                            <div>
                                <FaRegMoneyBillAlt className='homePromisesItemIcon' />
                                <h4>At rates you choose</h4>
                            </div>
                        </div>
                        <div className="homePromisesItem">
                            <div>
                                <GoCalendar className='homePromisesItemIcon' />
                                <h4>At your time</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeSplitBannerWrapper">
                <div className="homeSplitBannerContent">
                    <h1 className="homeSplitBannerTitle">
                        How it Works
                    </h1>
                    <div className="homeSplitBannerGrid">
                        <div className="homeSplitBannerImage">
                            <img src="/images/map.jpg" alt="map" />
                        </div>
                        <div className="homeSplitBannerTextBlock">
                            <div className="homeSplitBannerItem">
                                <AiOutlineCheckCircle className='homeSplitBannerIcon' />
                                <p>explanations how it works</p>
                            </div>
                            <div className="homeSplitBannerItem">
                                <AiOutlineCheckCircle className='homeSplitBannerIcon' />
                                <p>explanations how it works</p>
                            </div>
                            <div className="homeSplitBannerItem">
                                <AiOutlineCheckCircle className='homeSplitBannerIcon' />
                                <p>explanations how it works</p>
                            </div>
                            <div className="homeSplitBannerItem">
                                <AiOutlineCheckCircle className='homeSplitBannerIcon' />
                                <p>explanations how it works</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="letsStartCTAWrapper">
                <div className="letsStartCTATitle">
                    <h4>Getting started is easy</h4>
                </div>
                <div className="letsStartCTAItems">
                    <div className="letsStartCTAItem">
                        <IoMdLaptop className="letsStartCTAIcon" />
                        <h6>Register</h6>
                        <p>Napravi nalog kako bi dobio pristup opcijama</p>
                    </div>
                    <div className="letsStartCTAItem">
                        <FaFileSignature className="letsStartCTAIcon" />
                        <h6>Usluge</h6>
                        <p>Napisi sta zelis da radis</p>
                    </div>
                    <div className="letsStartCTAItem">
                        <RiFindReplaceLine className="letsStartCTAIcon" />
                        <h6>Pronadji</h6>
                        <p>Pronadji poslove na listi ili na mapi</p>
                    </div>
                </div>

                <button className="buttonCTA letsStartCTAButton">   <Link className='buttonCTALink' to='/signup'>REGISTRUJ SE</Link></button>

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
