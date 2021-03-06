import Axios from 'axios';

// SEND NEWS
export const sendNews = (value) => {
    return async (dispatch) => {
        await Axios.post("http://localhost:3001/sendNews", { value })
    }
}
export const getAllNews = () => {
    return async (dispatch) => {
        const response = await Axios.get("http://localhost:3001/getNews")
        dispatch({
            type: "SET_NEWS",
            payload: response.data.results
        })
    }
} 