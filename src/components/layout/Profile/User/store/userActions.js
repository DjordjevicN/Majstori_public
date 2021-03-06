import Axios from 'axios';
import * as notifications from '../../../../Notifications'
let hosting = "http://localhost:3001"
// CREATE SERVICES 
export const createNewService = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let post = await Axios.post(`${hosting}/createNewService`, { value })
        const response = await Axios.get(`${hosting}/getServices/${value.User_id}`)

        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        if (post.data.status) {
            notifications.success(post.data.notification)
        } else {
            notifications.fail(post.data.notification)
        }
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
    let userToken = localStorage.getItem('userToken');
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let post = await Axios.post(`${hosting}/updateUser`, { value }, {
            headers: {
                authorization: userToken
            }
        });
        const response = await Axios.get(`${hosting}/getUserById/${value.id}`)
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
                type: "NOTIFICATION",
                payload: response.data.notification
            })
            if (post.data.status) {
                notifications.success(post.data.notification)
            } else {
                notifications.fail(post.data.notification)
            }
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
        const response = await Axios.post(`${hosting}/createUser`, { newUser })

        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        if (response.data.status) {
            notifications.success(response.data.notification)
        } else {
            notifications.fail(response.data.notification)
        }
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
            type: 'SET_LOCAL_STATE_LOGOUT'
        })
    }
}
// DELETE USER FROM DATABASE
export const deleteUser = (value) => {
    let userToken = localStorage.getItem('userToken');
    return async (dispatch) => {
        const response = await Axios.get(`${hosting}/deleteUser/${value.id}`, {
            headers: {
                authorization: userToken
            }
        })
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
        if (response.data.status) {
            notifications.deleted(response.data.notification)
        } else {
            notifications.fail(response.data.notification)
        }
    }
}
// GET USER
export const getMyData = (value) => {
    let userToken = localStorage.getItem('userToken');
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`${hosting}/getMyData`, {
            headers: {
                authorization: userToken
            }
        });
        if (response.data.results.length <= 0) {
            dispatch({
                type: "NOTIFICATION",
                payload: response.data.notification
            })
            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            let myId = response.data.results[0].id;
            dispatch({
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })

            const getMyProposals = await Axios.get(`${hosting}/getMyProposals/${myId}`,)

            dispatch({
                type: "SET_MY_PROPOSALS_STATE",
                payload: getMyProposals.data.results
            })
            //             dispatch(getMyOffers(myID))
            const getMyOffers = await Axios.get(`${hosting}/getMyOffers/${myId}`,)

            dispatch({
                type: "UPDATE_MY_OFFERS_STATE",
                payload: getMyOffers.data.results
            })
            //             dispatch(getServices(myID))
            const getServices = await Axios.get(`${hosting}/getServices/${response.data.results[0].id}`)

            dispatch({
                type: "CREATE_SERVICE",
                payload: getServices.data.results
            })

            //             dispatch(getMyTasks(myID))
            const getMyTasks = await Axios.get(`${hosting}/getMyTasks/${response.data.results[0].id}`,)

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
// LOGIN USER
export const loginUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post(`${hosting}/loginUser`, { value });
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
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })
            dispatch({
                type: 'SET_LOCAL_STATE_TOKEN',
                payload: response.data.token
            })
            dispatch(getMyData())
        }
    }
}


// GET MY TASKS
export const getMyTasks = (value) => {
    return async (dispatch) => {
        const response = await Axios.get(`${hosting}/getMyTasks/${value}`,)
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
        if (value.taskAddress) {
            const response = await Axios.get(` https://api.opencagedata.com/geocode/v1/json?q=${value.taskAddress}&key=aa1b2e2507e3478f9059aabe4850e45f&language=en&pretty=1`)
            value.taskLatitude = response.data.results[0].geometry.lat
            value.taskLongitude = response.data.results[0].geometry.lng
        }
        let post = await Axios.post(`${hosting}/createTask`, { value })
        dispatch(getMyTasks(value.User_id))
        dispatch({
            type: 'LOADING_FALSE'
        })
        dispatch({
            type: "NOTIFICATION",
            payload: post.data.notification
        })
        if (post.data.status) {
            notifications.success(post.data.notification)
        } else {
            notifications.fail(post.data.notification)
        }
    }
}
// DELETE TASK
export const deleteTask = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`${hosting}/deleteTask/${value.taskId}`)

        if (response.data.status) {
            notifications.warning(response.data.notification)
        } else {
            notifications.fail(response.data.notification)
        }
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
        const response = await Axios.get(`${hosting}/getMyOffers/${value}`,)
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
        const response = await Axios.get(`${hosting}/getMyProposals/${value}`,)
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
// ADD CREDIT
export const addCredit = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.post(`${hosting}/addCredit`, { value });
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        if (response.data.status) {
            notifications.warning(response.data.notification)
        } else {
            notifications.fail(response.data.notification)
        }
        dispatch({
            type: "LOADING_FALSE"
        })
    }
}
// GET MY FAVORITE TASKS
export const getMyFavoriteTasks = (value) => {
    console.log(value);
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`${hosting}/getMyFavoriteTasks/${value}`,)
        console.log(response);
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })

        dispatch({
            type: "UPDATE_MY_FAVORITE_TASKS",
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
//   ADD TO FAV TABLE
export const addFav = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.post(`${hosting}/addFav`, { value });
        getMyFavoriteTasks(value.authUserID)
        dispatch({
            type: "NOTIFICATION",
            payload: response.data.notification
        })
        if (response.data.status) {
            notifications.success(response.data.notification)
        } else {
            notifications.fail(response.data.notification)
        }
        dispatch({
            type: "LOADING_FALSE"
        })
    }
}
// DELETE TASK FROM FAVORITE
export const deleteFromFav = (value) => {
    return async (dispatch) => {
        await Axios.get(`${hosting}/deleteFromFav/${value}`)
    }
}