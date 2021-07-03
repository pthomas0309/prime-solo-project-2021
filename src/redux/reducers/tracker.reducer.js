const trackerReducer = (state = [], action) => {

    // switch statement handles various action.type
    switch (action.type) {
        case 'SET_TRACKER': 
            return action.payload;
        default:
            return state;
    }
}

export default trackerReducer;