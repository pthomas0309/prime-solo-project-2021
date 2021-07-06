import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function UpdateDuration({dispatch, duration, setDuration}) {

    // bring in the duration reducer state
    // duration updates
    const durationUpdates = useSelector(store => store.duration);

    // function to dispatch to duration saga
    const finalizeUpdate = (e, tracker) => {

        // stop page load
        e.preventDefault();
                    
        // dispatch update object to
        // duration reducer state.queue
        dispatch({
            type: 'UPDATE_QUEUE',
            payload: duration[tracker.type]
        });

        // set duration reducer state.isUpdating 
        // to false by tracker.id
        dispatch({
            type: 'UPDATE_FINISHED',
            payload: tracker
        });

        // clear the inputs
        setDuration({
        ...duration,
            [tracker.type]: {
                hours: '',
                minutes: ''
            }
        });
            
    };

    // function to update state var based on input value
    const updateDuration = (e, tracker) => {

        // variable for the target value
        // rounded down to the nearest integer
        const inputVal = Math.floor(e.target.value);

        console.log(inputVal);
        // activates button and updates duration
        // object state when the input values
        // meet parameters
        if (
            e.target.name === 'hours' 
                && 
            inputVal > 0 
                && 
            inputVal <= 24
            ||  
            e.target.name === 'minutes' 
                && 
            inputVal > 0 
                && 
            inputVal < 60
        ) {

            console.log('in if');
            
            // stop page load
            e.preventDefault();

            // dispatch to the duration reducer to
            // set state.isUpdating to false
            dispatch({
                type: 'UPDATE_DURATION',
                payload: tracker
            });

            // update state based on activity name
            // and the name of the input at event origin
            setDuration({
                ...duration,
                    [tracker.type]: {
                        ...duration[tracker.type],
                        [e.target.name]: inputVal,
                    }
                }
            );
        }

        // executes if target value 
        // is not an empty string
        else {

            // stop page load
            e.preventDefault();

            // dispatch to the duration reducer to
            // set state.isUpdating to true
            dispatch({
                type: 'UPDATE_FINISHED',
                payload: tracker
            });

            // update state based on activity name
            // and the name of the input at event origin
            setDuration({
            ...duration,
                [tracker.type]: {
                    ...duration[tracker.type],
                    [e.target.name]: (e.target.value),
                }
            });
        }
    };

    // function to handle submitting updates
    const submitUpdates = e => {

        // stop page load
        e.preventDefault();

        // dispatch array to duration saga
        dispatch({
            type: 'PROCESS_QUEUE',
            payload: durationUpdates.queue
        });

        // clear the queue in reducer
        dispatch({
            type: 'CLEAR_QUEUE'
        });
    }

    // function to decide if 
    //the button is disabled or not
    const verifyIsUpdating = tracker => {

        // conditional to evaluate isUpdating obj
        // by tracker.id and input name attribute
        if (durationUpdates.isUpdating?.[tracker.id]) {
            console.log(durationUpdates.isUpdating?.[tracker.id]);

            // one of the inputs have a
            // value that isn't an empty string
            // activate queue button
            return false;
        }

        // executes when both inputs have 
        // values of an empty string
        else {
            console.log(durationUpdates.isUpdating);
            
            // disable queue button
            return true;
        };
    };

    // function to handle removing an update from the queue
    const deleteFromQueue = (i) => {

        // dispatch DELETE UPDATE action
        // to duraration reducer payload is index to delete
        dispatch({
            type: 'DELETE_UPDATE',
            payload: i
        })
    }

    // make tracker reducer state available as trackedActivities
    const trackedActivities = useSelector((store) => store.tracker);

    console.log(durationUpdates);
    console.log(duration);
    return (
        <div>
            <h2>Duration Updates</h2>
            {trackedActivities?.map(tracker => {
        
                return (
                    <form key={tracker.id} onSubmit={e => finalizeUpdate(e, tracker)} >
                        <p>{tracker.type}</p>
                        <br/>
                        <label htmlFor={`${tracker.type}HoursIn`}>
                            <input 
                                value={duration?.[tracker.type]?.hours}
                                name="hours"
                                onChange={e => updateDuration(e, tracker)}  
                                type="number" 
                                id={`${tracker.type}HoursIn`} /> hour(s)
                        </label>
                        <label htmlFor={`${tracker.type}MinutesIn`}>
                            <input 
                                value={duration?.[tracker.type]?.minutes}
                                name="minutes"
                                onChange={e => updateDuration(e, tracker)} 
                                type="number" 
                                id={`${tracker.type}MinutesIn`} /> minute(s)
                        </label>
                        <input type="submit" value="queue" disabled={verifyIsUpdating(tracker)} />
                    </form>
                )
            })}
            {durationUpdates.queue.map((update, i) => {
                console.log(i);
                return (
                    <div key={i}>
                        <h4>{update.activity}</h4>
                        <p>Duration of activity:</p>
                        {update.hours === '' ? 
                        <p>minute(s): {update.minutes}</p>
                        :
                        update.minutes === '' ? 
                        <p>hour(s): {update.hours}</p>
                        :
                        <p>hour(s): {update.hours} <br/> minute(s): {update.minutes}</p>
                        }
                        <button onClick={() => deleteFromQueue(i)} >DELETE</button>
                    </div>
                )
            })}
            <input type="submit" disabled={durationUpdates.queue[0] ? false : true} onClick={e => submitUpdates(e)} />            
        </div>
    );
}

export default UpdateDuration;