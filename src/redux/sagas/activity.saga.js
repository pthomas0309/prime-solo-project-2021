import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ACTIVITY" actions
function* fetchActivity() {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        // axios GET for user_activity table data
        const response = yield axios.get('/api/activity', config);

        // make the table data the state of the activities reducer
        yield put({ type: 'SET_ACTIVITY', payload: response.data });

    } 

    // catch executes after error in try
    catch (err) {

        console.log('Error in activity GET', err);

    };
};

// worker Saga: will be fired on "ADD_NEW_ACTIVITY" actions
function* addActivity(action) {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        // axios POST for adding an activity to the user_activity table
        yield axios.post('/api/activity', action.payload, config);

        // run the saga to GET all activity
        yield put({ type: 'FETCH_ACTIVITY' });

    } 

    // catch executes after error in try
    catch (err) {

        console.log('Error in activity POST', err);

    };
};

// worker Saga: will be fired on "DELETE_ACTIVITY" actions
function* deleteActivity(action) {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        console.log(action.payload);
        // axios POST for adding an activity to the user_activity table
        yield axios.delete(`/api/activity/${action.payload.activityId}/${action.payload.userId}`, config);

        // run the saga to GET all activity
        yield put({ type: 'FETCH_ACTIVITY' });

    } 

    // catch executes after error in try
    catch (err) {

        console.log('Error in activity DELETE', err);

    };
};

// listener for saga actions
function* activitySaga() {

    // listen for 'FETCH_ACTIVITY' action then run fetchActivity
    yield takeLatest('FETCH_ACTIVITY', fetchActivity);

    // listen for 'ADD_NEW_ACTIVITY' action then run addActivity
    yield takeLatest('ADD_NEW_ACTIVITY', addActivity);

    // listen for 'FETCH_ACTIVITY' action then run fetchActivity
    yield takeLatest('DELETE_ACTIVITY', deleteActivity);

}

export default activitySaga;