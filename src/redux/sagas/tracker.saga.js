import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_TRACKER" actions
function* fetchTracker(action) {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        // axios GET for fetching data from the tracker table
        const trackerObjects = yield axios.get('/api/tracker', config);

        // set the state of the tracker reducer to
        // the tracker table data
        yield put({ type: 'SET_TRACKER', payload: trackerObjects.data });

    } 

    // catch executes after error in try
    catch (err) {

        console.log('Error in tracker GET', err);

    };
};

// worker Saga: will be fired on "ADD_NEW_TRACKER" actions
function* addTracker(action) {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        console.log('POSTing tracker');
        // axios POST for adding a tracker to the tracker table
        yield axios.post('/api/tracker', action.payload, config);
        console.log('tracker POSTed');

        // run the saga to GET all trackers
        yield put({ type: 'FETCH_TRACKER' });

    } 

    // catch executes after error in try
    catch (err) {

        console.log('Error in tracker POST', err);

    };
};

// listener for saga actions
function* activitySaga() {

    // listen for 'FETCH_TRACKER' action then run addTracker
    yield takeLatest('FETCH_TRACKER', fetchTracker);

    // listen for 'ADD_NEW_TRACKER' action then run addTracker
    yield takeLatest('ADD_NEW_TRACKER', addTracker);

}

export default activitySaga;