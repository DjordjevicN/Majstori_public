import React, { useState, useRef, useEffect } from 'react';
import { Divider } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux'
import * as actionCreator from '../../../store/actions/actions'
import { Link } from 'react-router-dom'
import options from '../../OptionsData'
function Services(props) {
    const [openTab, setOpenTab] = useState(false)
    const [category, setCategory] = useState('Razno');
    const [page, setPage] = useState(0)
    let filter = {
        category,
        page
    }
    let menuRef = useRef()

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
                            <p>{category}</p>
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
                        handleSearch()
                    }}>TRAZI</button>
                </div>
            </div>
            <div className='serviceCardWrapper' >
                <div className='serviceCard'>
                    {props.serviceUsers.length > 0 ? props.serviceUsers.map((item) => (
                        <div className='serviceCardPaper' key={item.service_ID}>
                            <div className='serviceCardLeft'>
                                {/* fix this on hosting  */}
                                <img className='serviceCardLeftAvatar' src='/images/johnDoe.jpg' alt="ll" />
                                <div className='serviceProfileActions'>
                                    <div>
                                        <p className='serviceUserInfoEmail serviceUserInfo'>Email: <span>{item.email}</span></p>
                                        <p className='serviceUserInfoPhone serviceUserInfo'>Telefon: <span>{item.phoneNumber}</span></p>
                                        <Link to={`/userProfile/${item.id}`} className='serviceUserBTNLink' onClick={() => {
                                            props.getFullProfileById(item.id)
                                        }}>Profil</Link>


                                    </div>
                                </div>
                            </div>
                            <div className='serviceCardRight'>
                                <div className='serviceCardRightTop'>
                                    <div className='serviceCardRightTopElementWrapper'>
                                        <h2 className='serviceCardRightTopName'>{item.firstName} {item.lastName}</h2>
                                        <div className='serviceCardRightTopElement'>
                                            <CheckIcon className='serviceCardRightTopElementIcon' />
                                            <p>{item.completedTasks} - Zavrsenih Poslova</p>
                                        </div>
                                        <div className='serviceCardRightTopElement'>
                                            <StarOutlinedIcon className='serviceCardRightTopElementIcon' />
                                            <p> {item.like} - Pozitivnih ocena</p>
                                        </div>
                                    </div>
                                    <p className='serviceCardRightTopPrice'><span>{item.serviceCategory}</span> - {item.servicePrice}</p>
                                </div>
                                <Divider />
                                <div className='serviceCardRightBottom'>
                                    <h4>Kako mogu da pomognem</h4>
                                    <p >{item.serviceDescription}</p>
                                </div>
                            </div>
                        </div>
                    )) : <div className="noUser">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>}
                </div>
                {props.serviceUsers.length > 0 ? <p className='loadMoreBTN' onClick={() => {
                    loadMore()
                }} >LOAD MORE</p> : <p className='NoTasks'>Pronadjite taks iz vase kategorije</p>}
            </div>
        </div>
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







