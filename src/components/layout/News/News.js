import React from 'react';
import { connect } from 'react-redux'

function News(props) {
    return (
        <div className='newsWrapper' >
            <h5 className='newsTabTitle'>NEWS</h5>
            <div className="newsCard">
                <div className="newsCardContent">
                    <h3 className="newsCardTitle">Naslov posta</h3>
                    <p className="newsCardMessage">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <p className="newsCardDate">30.2.2020</p>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        news: state.NewsReducer.news,
        loading: state.NewsReducer.loading,
    }
}


export default connect(mapStateToProps, null)(News)
