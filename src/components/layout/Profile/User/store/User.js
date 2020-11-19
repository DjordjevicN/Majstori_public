
const initState = {
    authUser: {},
    myTasks: [],
    myServices: [],
    myOffers: [],
    myProposals: [],
    loading: false,
    notification: 'Notification testing'
}
const User = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "NOTIFICATION":
            newState.notification = action.payload;
            break;
        case "CREATE_USER":
            newState.user = action.payload;
            break;
        case "LOGIN_USER":
            newState.authUser = action.payload;
            break;
        case "LOGOUT_USER":
            newState.authUser = {};
            break;
        case "DEACTIVATE_USER":
            newState.authUser.activeUser = false;
            break;
        case "UPDATE_USER":
            newState.authUser = action.payload;
            break;
        case "SET_LOCAL_STATE_LOGIN":
            localStorage.setItem('authUser', JSON.stringify(action.payload))
            break;
        case "SET_LOCAL_STATE_LOGOUT":
            localStorage.setItem('authUser', action.payload)
            break;
        case "DEDUCT_CREDIT":
            newState.authUser.credit = action.payload;
            break;
        // *************************************** 
        case "UPDATE_MY_OFFERS_STATE":
            newState.myOffers = action.payload;
            break;
        case "SET_MY_PROPOSALS_STATE":
            newState.myProposals = action.payload;
            break;
        case "UPDATE_MY_TASK_STATE":
            newState.myTasks = action.payload;
            break;
        case "CREATE_SERVICE":
            newState.myServices = action.payload;
            break;

        case "REMOVE_SERVICE":
            newState.myServices = newState.myServices.filter(item => item.service_ID !== action.payload)
            break;
        // *************************************** 
        default:
            newState = state
    }
    return newState;
}
export default User;