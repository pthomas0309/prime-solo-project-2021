import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "PROCESS_QUEUE" actions
function* processQueue(action) {

    // try executes until error
    try {

        // the config includes credentials which
        // allow the server session to recognize the user
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };

        // loop through the queue to process
        // updates one at a time
        for (let update of action.payload) {

            // axios POST route to the updates table
            yield axios.post('/api/updates', update, config);
        };
    }

    // catch executes when 
    // there's error in try
    catch (err) {
        console.log('error in updates POST', err);
    };
}

// listener for saga actions
function* durationSaga() {

    // listen for 'SUBMIT_UPDATE_QUEUE' action then run processQueue
    yield takeLatest('PROCESS_QUEUE', processQueue);

}

export default durationSaga;