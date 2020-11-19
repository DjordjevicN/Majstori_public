import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../News/store/NewsActions'
function AdminSendNews(props) {
    const [newsTitle, setNewsTitle] = useState('')
    const [newsMessage, setNewsMessage] = useState('')
    const handleSubmit = () => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let newsCreated_at = `${day}.${month}.${year}`
        let news = {
            newsTitle,
            newsMessage,
            newsCreated_at
        }
        props.sendNews(news)
    }
    return (
        <div className="newsWrapper">
            <div className="newsForm">
                <div>
                    <input className='newsInput' type="text" placeholder='Naslov' onChange={(e) => {
                        setNewsTitle(e.target.value)
                    }} />
                </div>
                <div>
                    <textarea className='newsInput' placeholder='Poruka' onChange={(e) => {
                        setNewsMessage(e.target.value)
                    }} />
                    <p className='newsSubmitBTN' onClick={() => {
                        handleSubmit()
                    }} >SUBMIT</p>
                </div>
            </div>

        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendNews: (news) => dispatch(actionCreator.sendNews({ news }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSendNews);