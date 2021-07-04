const durationReducer = (state = { queue: [], isUpdating: {}, }, action) => {

    // switch to handle different action.type
    switch (action.type) {
        case 'UPDATE_QUEUE':
            return {queue: [...state,queue, action.payload], ...state};
        case 'CLEAR_QUEUE':
            return {queue: [], ...state};
        case 'UPDATE_DURATION':
            return {isUpdating: {...state,isUpdating, [action.payload.id]: true}, ...state};
        case 'UPDATE_FINISHED':
            return {isUpdating: {...state,isUpdating, [action.payload.id]: false}, ...state}
        default:
            return state;
    };
};