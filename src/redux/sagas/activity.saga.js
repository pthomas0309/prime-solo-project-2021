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
    catch (error) {

        console.log('Error in activity GET', error);

    }
}

// listener for saga actions
function* activitySaga() {


    yield takeLatest('FETCH_ACTIVITY', fetchActivity);

}

export default activitySaga;