
import Axios from 'axios';
import * as notifications from '../../components/Notifications'
// Axios.defaults.withCredentials = true;

// GET SERVICES ALL
export const getMyServices = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.get(`http://localhost:3001/getServices/${value}`)
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// GET PROFILE WITH FILTER by category display on SERVICES after search
export const getSearchServices = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post(`http://localhost:3001/getSearchServices`, { value })
        dispatch({
            type: 'UPDATE_ALL_SERVICES_STATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
//CLEAR SERVICE LIST
export const clearServiceFromState = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "CLEAR_ALL_SERVICES_FORM_STATE"
        })
    }
}
// DELETE SERVICES
export const deleteService = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`http://localhost:3001/deleteService/${value}`)

        dispatch({
            type: "REMOVE_SERVICE",
            payload: value
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
// CLEAR_ALL_TASKS_FORM_STATE
export const clearTasksFromState = (value) => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_ALL_TASKS_FORM_STATE'
        })
    }
}
export const getFilteredTasks = (value) => {

    return async (dispatch) => {
        const response = await Axios.post(`http://localhost:3001/getFilteredTasks`, { value })

        dispatch({
            type: 'UPDATE_ALL_TASK_STATE',
            payload: response.data.results
        })
    }
}
// GET TASK LATEST 10
export const getLatestTasks = () => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.get(`http://localhost:3001/getLatestTasks`)
        dispatch({
            type: 'UPDATE_ALL_TASK_STATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// GET TASKS all
export const getAllTasks = () => {
    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/getNewestTasks`)
        dispatch({
            type: "UPDATE_HOME_TASK_STATE",
            payload: response.data.results
        })
    }
}
// CREATE TASK_OFFER
export const sendOffer = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post("http://localhost:3001/sendOffer", { value })
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
// APPROVE PROPOSAL
export const approveProposal = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        await Axios.post("http://localhost:3001/approveProposal", { value })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}

// GET NEWEST TASKS
export const getNewestTasks = () => {
    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/getNewestTasks`)
        dispatch({
            type: 'UPDATE_ALL_TASK_STATE',
            payload: response.data.results
        })
    }
}
// GET MY SERVICES
export const getServices = (value) => {
    return async (dispatch) => {
        const getServices = await Axios.get(`http://localhost:3001/getServices/${value}`)

        dispatch({
            type: "CREATE_SERVICE",
            payload: getServices.data.results
        })
    }
}
// GET USER BY ID
export const getFullProfileById = (value) => {
    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/getFullProfileById/${value}`)
        dispatch({
            type: "SET_SERVICE_USER_VIEW",
            payload: response.data.results
        })
    }
}

// GET TASK BY ID and HIS POSTER
export const getTaskById = (value) => {

    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:3001/getTaskById/${value}`)

        dispatch({
            type: "SET_TASK_VIEW",
            payload: response.data.results[0]
        })
    }
}


// DEDUCT CREDIT
export const deductCredit = (usersCredit) => {
    let newCredit = usersCredit.credit - 1;
    let value = {
        credit: newCredit,
        id: usersCredit.userId
    }
    return async (dispatch) => {
        await Axios.post("http://localhost:3001/updateUsersCredit", { value });
        dispatch({
            type: "DEDUCT_CREDIT",
            payload: value.credit
        })

    }
}

// ********* TO DO **********

// CREATE ADMIN_LOG =>
// GET ALL USERS || GOD ||
// GET ALL SERVICES || GOD || 
// GET ALL TASKS || GOD ||
// GET ALL APPLICATIONS || GOD ||
// ANY TIME SOMETHING IS GOING TO DATABASE SEND IT TO GOD DATABASE
























// GET PROFILE LOGIN get user ||if exist|| and set it in state.authUser. get myTasks set to state.myTasks, get myApplications set to state.myApplications, get myServices set to state.myServices
// export const loginUser = (value) => {

//     return async (dispatch) => {
//         
//         // dispatch(getUsersAssets(74))
//         dispatch({
//             type: "LOADING_TRUE"
//         })
//         const response = await Axios.post("http://localhost:3001/loginUser", { value })
//         let myID = response.data.results[0].id;
//         if (response.data.results.length <= 0) {
//             dispatch({
//                 type: "NOTIFICATION",
//                 payload: response.data.notification
//             })
//             dispatch({
//                 type: "LOADING_FALSE"
//             })
//         } else {
//             // getNewestTasks
//             dispatch(getNewestTasks())
//             dispatch(getServices(myID))
//             dispatch(getMyTasks(myID))
//             dispatch(getMyProposals(myID))
//             dispatch(getMyOffers(myID))

//             dispatch({
//                 type: 'LOGIN_USER',
//                 payload: response.data.results[0]
//             })

//             dispatch({
//                 type: 'SET_LOCAL_STATE_LOGIN',
//                 payload: response.data.results[0]
//             })
//             dispatch({
//                 type: "NOTIFICATION",
//                 payload: response.data.notification
//             })
//             dispatch({
//                 type: "LOADING_FALSE"
//             })


//         }
//     }
// }
