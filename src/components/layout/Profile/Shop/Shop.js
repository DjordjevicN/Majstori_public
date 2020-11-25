import React from 'react';
import { connect } from 'react-redux'
import * as userActionCreator from '../User/store/userActions'
import * as actionCreator from '../../../../store/actions/actions'
function Shop(props) {
    let userId = props.authUser.id;
    console.log(userId);
    const handlePack = (cred) => {

        let value = {
            credit: 0,
            userVipStatus: 0,
            userRank: 0,
            userId
        }
        switch (cred) {
            case 1:
                value.credit = 30
                break;

            default:
                break;
        }
        props.addCredit(value)
    }
    return (
        <div className='shopWrapper'>
            <div className="shopContent">
                <div className="textPromotion">
                    <h1>Shop</h1>
                    <p>Ovde mozete dopuniti kredit i didati nove opcije koje su vam dostupne</p>
                </div>
                <div className="cardsWrapper">
                    <div className="card">
                        <div className="cardTop">
                            <h2>
                                FREE
                            </h2>
                        </div>
                        <div className="cardBottom">
                            <h4>Mesecni Paket 1</h4>
                            <p> + 30 kredita</p>

                        </div>
                        <div className="cardAction">
                            <p className='shopBTN' onClick={() => {
                                handlePack(1)
                            }} >KUPI</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardTop">
                            <h2>
                                FREE
                            </h2>
                        </div>
                        <div className="cardBottom">
                            <h4>Mesecni Paket 2</h4>
                            <p> + 30 kredita</p>
                            <p> + 30 kredita</p>
                            <p> + 30 kredita</p>
                        </div>
                        <div className="cardAction">
                            <p className='shopBTN' onClick={() => {
                                handlePack(1)
                            }} >KUPI</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardTop">
                            <h2>
                                FREE
                            </h2>
                        </div>
                        <div className="cardBottom">
                            <h4>Mesecni Paket 3</h4>
                            <p> + 30 kredita</p>
                            <p> + 30 kredita</p>
                            <p> + 30 kredita</p>
                        </div>
                        <div className="cardAction">
                            <p className='shopBTN' onClick={() => {
                                handlePack(1)
                            }} >KUPI</p>
                        </div>
                    </div>


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
        getLatestTasks: () => dispatch(actionCreator.getLatestTasks()),
        addCredit: (value) => dispatch(userActionCreator.addCredit(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
