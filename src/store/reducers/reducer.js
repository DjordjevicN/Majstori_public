
const initState = {
    tasks: [],
    taskView: {},
    serviceUsers: [],
    serviceUserView: [],
    loading: false,
    notification: 'Notification testing'
}
const globalReducer = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "LOADING_TRUE":
            newState.loading = true;
            break;
        case "LOADING_FALSE":
            newState.loading = false;
            break;
        case "NOTIFICATION":
            newState.notification = action.payload;
            break;
        case "UPDATE_ALL_SERVICES_STATE":
            newState.serviceUsers = action.payload;
            break;
        case "UPDATE_ALL_TASK_STATE":
            newState.tasks = action.payload;
            break;
        case "SET_SERVICE_USER_VIEW":
            newState.serviceUserView = action.payload;
            break;
        case "SET_TASK_VIEW":
            newState.taskView = action.payload;
            break;
        default:
            newState = state
    }
    return newState;
}
export default globalReducer;




