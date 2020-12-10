import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux'
import * as actionCreator from '../../../store/actions/actions'
import { Link } from 'react-router-dom'
import options from '../../OptionsData'
import { FiTag } from "react-icons/fi";
// FiHeart, FiSearch, FiTag, FiKey,FiCheckCircle, FiClock, FiMapPin,FiHeart
function Services(props) {
    const [openTab, setOpenTab] = useState(false)
    const [category, setCategory] = useState('Razno');
    const [page, setPage] = useState(0)
    let filter = {
        category,
        page
    }
    let menuRef = useRef()
    let users = props.serviceUsers;

    const handleSearch = () => {
        let filter = {
            category,
            page: 0
        }
        props.clearServiceFromState()
        props.getSearchServices(filter)
        setPage(5)
    }
    const loadMore = () => {
        props.getSearchServices(filter)
        setPage(page + 5)
    }
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setOpenTab(false)
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])
    return (
        <div className='serviceRoot'>
            <div className='searchInputWrapper'>
                <div className='searchInput'>
                    <div className="searchFormWrapper">
                        <div className="selectTab" onClick={() => {
                            if (openTab) {
                                setOpenTab(false)
                            } else {
                                setOpenTab(true)
                            }
                        }} >
                            {category === '' ? <p>Odaberi Kategoriju</p> : <p>{category}</p>
                            }
                            <KeyboardArrowDownIcon />

                        </div>
                    </div>
                    {openTab ? <div className="optionsWrapper">
                        <div className="options" ref={menuRef}>
                            {options.map((item) => {
                                if (item.main) {
                                    return <div key={item.id} className="optionItems optionItemMain" onClick={() => {
                                        setCategory(item.value)
                                        setOpenTab(false)
                                    }} >{item.title}</div>
                                }
                                return <div key={item.id} className="optionItems " onClick={() => {
                                    setCategory(item.value)
                                    setOpenTab(false)
                                }} >{item.title}</div>
                            })}
                        </div>
                    </div> : <div ref={menuRef}></div>}
                    <button className="searchButtons" onClick={() => {
                        setPage(0)
                        handleSearch()
                    }}>TRAZI</button>
                </div>
            </div>

            <div>
                <div className="taskerCardsWrapper">
                    <div className="taskerCardsContent">
                        {users && users.map((item) => (
                            <div className="taskerCard" key={item.service_ID}>
                                <div className="taskerCardOuter">
                                    <img className='taskerCardRank' src={`/images/taskerRank${item.userRank}.png`} alt="" />
                                </div>
                                <Link className="taskerCardLink" to={`/userProfile/${item.User_id}`} onClick={() => {
                                    props.getFullProfileById(item.id)
                                }}>  <div className="taskerCardInner">
                                        <div className="taskerCardInnerInfo">
                                            <div className="avatar">
                                                {item.avatar ? <img src={`http://localhost:3001/uploads/${item.avatar}`} alt="profile" className='avatarImage' /> : <img src="./images/zanatlija.png" className='avatarImage' alt="profile" />}
                                            </div>
                                            <div className="taskerDetails">
                                                <div className="taskerName">
                                                    {item.firstName ? <h2>{item.firstName}</h2> : <h2>{item.email}</h2>}

                                                </div>
                                                <div>
                                                    {item.completedTasks ? <p className='finishedTasks'>
                                                        {item.completedTasks} Zavrsenih poslova
                                                </p> : <p className='finishedTasks'>0 Zavrsenih poslova</p>}
                                                </div>
                                                <div className="taskerCardInnerService">
                                                    <div className="taskerServicePriceCategory">
                                                        <h3>{item.serviceCategory}</h3>
                                                        <div className="taskerServicePrice">
                                                            <FiTag className="taskerServicePriceCategoryIcon" />
                                                            {item.servicePrice > 0 ? <p>{item.servicePrice}</p> : <p> Kontakt</p>}
                                                        </div>
                                                    </div>
                                                    <div className="categoryDescription">
                                                        <p>{item.serviceDescription}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="taskerGrade">
                                                <div className="gradeIcon">
                                                    {item.taskerGrade ? <h3>{item.taskerGrade}</h3> : <h3>8.8</h3>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {props.serviceUsers.length > 5 ? <p className='loadMoreBTN' onClick={() => {
                    loadMore()
                }} >+ Ucitaj Jos</p> : null}
                {props.serviceUsers.length > 0 ? null : <p className='noTasks'>Pronadjite posao iz zeljene kategorije</p>}
            </div>
        </div >
    );
}
const mapStateToProps = (state,) => {
    return {
        serviceUsers: state.globalReducer.serviceUsers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getSearchServices: (category) => dispatch(actionCreator.getSearchServices(category)),
        getFullProfileById: (id) => dispatch(actionCreator.getFullProfileById(id)),
        clearServiceFromState: () => dispatch(actionCreator.clearServiceFromState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Services)







