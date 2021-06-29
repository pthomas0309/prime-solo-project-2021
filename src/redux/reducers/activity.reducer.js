const activityReducer = (state = [], action) => {

    // switch statement handles various action.type
    switch (action.type) {
        case 'SET_ACTIVITY': 
            return action.payload;
        default:
            return state;
    }
}

export default activityReducer;