import React from 'react';
import { connect } from 'react-redux'

function News(props) {
    let news = props.news;
    console.log(news);
    return (
        <div className='newsWrapper' >
            <h5 className='newsTabTitle'>NEWS</h5>
            {news && news.map((item) => (
                <div className="newsCard" key={item.newsId}>
                    <div className="newsCardContent">
                        <h3 className="newsCardTitle"> {item.newsTitle} </h3>
                        <p className="newsCardMessage"> {item.newsMessage} </p>
                        <p className="newsCardDate">{item.newsCreated_at}</p>
                    </div>
                </div>
            ))}

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
