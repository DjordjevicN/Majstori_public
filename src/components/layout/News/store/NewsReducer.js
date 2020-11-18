
const initState = {
    news: {},
    loading: false,
    notification: ' news Notification'


}
const NewsReducer = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "SET_NEWS":
            newState.news = action.payload;
            break;

        // *************************************** 
        default:
            newState = state
    }
    return newState;
}
export default NewsReducer;