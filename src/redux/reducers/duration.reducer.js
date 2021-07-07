const durationReducer = (state = { queue: [], isUpdating: {} }, action) => {

    // switch to handle different action.type
    switch (action.type) {
        case 'UPDATE_QUEUE':
            return {...state, queue: [...state.queue, action.payload]};
        case 'DELETE_UPDATE':
            const index = action.payload
            state.queue.splice(index, 1);
            console.log(state.queue);
            return {...state, queue: state.queue};
        case 'CLEAR_QUEUE':
            return {...state, queue: []};
        case 'UPDATE_DURATION':
            console.log(action.payload.id);
            return {...state, isUpdating: {...state.isUpdating, [action.payload.id]: true}};
        case 'UPDATE_FINISHED':
            return {...state, isUpdating: {...state.isUpdating, [action.payload.id]: false}}
        default:
            return state;
    };
};

export default durationReducer;