import React, { useState } from 'react';
import { Divider } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux'
import * as actionCreator from '../../../store/actions/actions'
import { Link } from 'react-router-dom'
// import gravatar from 'gravatar'

// <img src={gravatar.url('nikola.dj.87@gmail.com', { s: '200', r: 'pg', d: '404' })} /> 
// on search return all profiles that have specific category order by highest completedTasks limit 10
function Services(props) {
    const [openTab, setOpenTab] = useState(false)
    const [category, setCategory] = useState('Razno');
    const handleSearch = () => {
        props.getSearchServices(category)
    }
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
                    {openTab && <div className="optionsWrapper">
                        <div className="options">
                            <button className="closeSearch" onClick={() => {
                                setOpenTab(false)
                            }}>x</button>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Dom')
                            }} >Dom</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Ciscenje')
                            }}>Ciscenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Elektricar')
                            }}>Elektricar</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Vodoinstalater')
                            }}>Vodoinstalater</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Moler')
                            }}>Moler</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Bastovan')
                            }}>Bastovan</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Razno')
                            }}>Razno</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Lepota')
                            }} >Lepota</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Frizer')
                            }}>Frizer</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sminker')
                            }}>Sminker</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Nokti')
                            }}>Nokti</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Masaza')
                            }}>Masaza</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Zivotinje')
                            }} >Zivotinje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Groomer')
                            }}>Groomer</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Cuvar')
                            }}>Cuvar</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Poljoprivreda')
                            }} >Poljoprivreda</div>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Tattoo')
                            }} >Tattoo</div>
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Muzika')
                            }} >Muzika</div>

                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Moda')
                            }} >Moda</div>
                            <div className="optionItems " onClick={() => {
                                setOpenTab(false)
                                setCategory('Ciscenje')
                            }} >Ciscenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sivenje')
                            }} >Sivenje</div>
                            <div className="optionItems" onClick={() => {
                                setOpenTab(false)
                                setCategory('Sister')
                            }} >Sister</div>
                            {/* *********************  */}
                            <div className="optionItems optionItemMain" onClick={() => {
                                setOpenTab(false)
                                setCategory('Auto/Moto')
                            }} >Auto/Moto</div>
                        </div>
                    </div>}
                    <button className="searchButtons" onClick={() => {
                        handleSearch()
                    }}>SEARCH</button>
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
        getFullProfileById: (id) => dispatch(actionCreator.getFullProfileById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Services)







