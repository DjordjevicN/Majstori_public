import Axios from 'axios';

// CREATE SERVICES 
export const createNewService = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post("http://localhost:3001/createNewService", { value })
        const response = await Axios.get(`http://localhost:3001/getServices/${value.User_id}`)
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        dispatch({
            type: "CREATE_SERVICE",
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// UPDATE USER PROFILE  
export const updateUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post("http://localhost:3001/updateUser", { value });
        const response = await Axios.get(`http://localhost:3001/getUserById/${value.id}`)

        if (response.data.results.length <= 0) {
            dispatch({
                type: "NOTIFICATION",
                payload: response.data.notification
            })
            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            dispatch({
                type: 'UPDATE_USER',
                payload: response.data.results[0]
            })
            dispatch({
                type: 'SET_LOCAL_STATE_LOGIN',
                payload: response.data.results[0]
            })
            dispatch({
                type: "NOTIFICATION",
                payload: response.data.notification
            })

            dispatch({
                type: "LOADING_FALSE"
            })
        }
    }
}
// CREATE NEW USER || SIGNUP ||
export const createUser = (value) => {
    let newUser = value.state
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post("http://localhost:3001/adduser", { newUser })

        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// LOGOUT USER
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT_USER"
        })
        dispatch({
            type: 'SET_LOCAL_STATE_LOGOUT',
            payload: false
        })
    }
}
// DELETE USER FROM DATABASE
export const deleteUser = (value) => {

    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/deleteUser/${value.id}`)

        dispatch({
            type: 'SET_LOCAL_STATE_LOGOUT',
            payload: false
        })
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        dispatch({
            type: "LOGOUT_USER"
        })
    }
}

// LOGIN USER
export const loginUser = (value) => {

    const { email, password } = value;
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post("http://localhost:3001/loginUser", { email: email, password: password })


        if (response.data.results.length <= 0) {
            dispatch({
                type: "NOTIFICATION",
                payload: response.data.notification
            })
            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            // //getServices()
            let myId = response.data.results[0].id;
            dispatch({
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })

            dispatch({
                type: 'SET_LOCAL_STATE_LOGIN',
                payload: response.data.results[0]
            })
            const gewNewestTasks = await Axios.get(`http://localhost:3001/getNewestTasks`)
            dispatch({
                type: 'UPDATE_ALL_TASK_STATE',
                payload: gewNewestTasks.data.results
            })

            //             dispatch(getMyProposals(myID))
            const getMyProposals = await Axios.get(`http://localhost:3001/getMyProposals/${myId}`,)
            // for each
            dispatch({
                type: "SET_MY_PROPOSALS_STATE",
                payload: getMyProposals.data.results
            })
            //             dispatch(getMyOffers(myID))
            const getMyOffers = await Axios.get(`http://localhost:3001/getMyOffers/${myId}`,)

            dispatch({
                type: "UPDATE_MY_OFFERS_STATE",
                payload: getMyOffers.data.results
            })
            //             dispatch(getServices(myID))
            const getServices = await Axios.get(`http://localhost:3001/getServices/${response.data.results[0].id}`)

            dispatch({
                type: "CREATE_SERVICE",
                payload: getServices.data.results
            })

            //             dispatch(getMyTasks(myID))
            const getMyTasks = await Axios.get(`http://localhost:3001/getMyTasks/${response.data.results[0].id}`,)

            dispatch({
                type: "UPDATE_MY_TASK_STATE",
                payload: getMyTasks.data.results
            })

            dispatch({
                type: "NOTIFICATION",
                payload: response.data.notification
            })
            dispatch({
                type: "LOADING_FALSE"
            })


        }
    }
}


// GET MY TASKS
export const getMyTasks = (value) => {
    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/getMyTasks/${value}`,)
        dispatch({
            type: "UPDATE_MY_TASK_STATE",
            payload: response.data.results
        })
    }
}
// CREATE TASK
export const createTask = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post(`http://localhost:3001/createTask`, { value })
        dispatch(getMyTasks(value.User_id))
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// DELETE TASK
export const deleteTask = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`http://localhost:3001/deleteTask/${value.taskId}`)
        await dispatch(getMyTasks(value.userId))


        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// GET MY OFFERS
export const getMyOffers = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`http://localhost:3001/getMyOffers/${value}`,)
        // for each
        dispatch({
            type: "UPDATE_MY_OFFERS_STATE",
            payload: response.data.results
        })
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })

        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// GET MY PROPOSALS
export const getMyProposals = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`http://localhost:3001/getMyProposals/${value}`,)
        // for each
        dispatch({
            type: "SET_MY_PROPOSALS_STATE",
            payload: response.data.results
        })
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })

        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
