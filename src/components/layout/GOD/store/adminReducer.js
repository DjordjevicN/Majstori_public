const initState = {
    allUsers: [],
    allTasks: [],
    allOffers: [],
    loading: false,
    notification: ''

}
const AdminState = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "SET_ALL_USERS":
            newState.news = action.payload;
            break;

        // *************************************** 
        default:
            newState = state
    }
    return newState;
}
export default AdminState;