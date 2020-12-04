import Axios from 'axios';


export const getAllUsers = () => {
    return async (dispatch) => {
        const response = await Axios.get("http://localhost:3001/getAllUsers")
        dispatch({
            type: "SET_ALL_USERS",
            payload: response.data.results
        })
    }
} 