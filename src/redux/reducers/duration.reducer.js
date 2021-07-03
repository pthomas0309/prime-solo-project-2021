const durationReducer = (state = {}, action) => {

    // switch to handle different action.type
    switch (action.type) {
        case 'SET_DURATION':
            return action.payload;
        default:
            return state;
    };
};