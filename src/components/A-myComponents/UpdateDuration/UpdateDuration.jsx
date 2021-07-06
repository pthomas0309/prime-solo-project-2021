import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function UpdateDuration({dispatch}) {

    // bring in the duration reducer state
    // duration updates
    const durationUpdates = useSelector(store => store.duration);
  
    // state variable for the duration of an activity
    const [durationHrMin, setDurationHrMin] = useState({});

    // function to dispatch to duration saga
    const finalizeUpdate = (e, tracker) => {

        // stop page load
        e.preventDefault();

        // switch statement handles activating the 
        // queue button and updating the variable state
            switch (true) {

                // case: a number from 1 and 59 has
                // been typed in the minutes input 
                // of an activity section
                case 
                (
                durationHrMin[tracker.type].minutes > 0 
                    &&
                durationHrMin[tracker.type].minutes < 60
                ):

                    // dispatch update object to
                    // duration reducer state.queue
                    dispatch({
                        type: 'UPDATE_QUEUE',
                        payload: durationHrMin[tracker.type]
                    });

                    // set duration reducer state.isUpdating 
                    // to false by tracker.id
                    dispatch({
                        type: 'UPDATE_FINISHED',
                        payload: tracker
                    });

                    // clear the duration data state obj
                    setDurationHrMin({
                        ...durationHrMin,
                        [tracker.type]: {}
                    });

                    // clear inputs
                    e.target.reset();
                    return;

                // case: a number from 1 and 24 has
                // been typed in the minutes input 
                // of an activity section
                case 
                (
                durationHrMin[tracker.type].hours > 0
                    &&
                durationHrMin[tracker.type].hours <= 24
                ):
    
                    // dispatch update object to
                    // duration reducer state.queue
                    dispatch({
                        type: 'UPDATE_QUEUE',
                        payload: durationHrMin[tracker.type]
                    });
    
                    // set duration reducer state.isUpdating 
                    // to false by tracker.id
                    dispatch({
                        type: 'UPDATE_FINISHED',
                        payload: tracker
                    });

                    // clear the duration data state obj
                    setDurationHrMin({
                        ...durationHrMin,
                        [tracker.type]: {}
                    });

                    // clear inputs
                    e.target.reset();
                    return;

                // case: number from 1-59 in the minutes input
                // and a number from 1-24 in the hours input
                // of an activity section
                case
                (
                durationHrMin[tracker.type].minutes > 0 
                    &&
                durationHrMin[tracker.type].minutes < 60
                    &&
                durationHrMin[tracker.type].hours > 0
                    &&
                durationHrMin[tracker.type].hours <= 24
                ):
                    
                    // dispatch update object to
                    // duration reducer state.queue
                    dispatch({
                        type: 'UPDATE_QUEUE',
                        payload: durationHrMin[tracker.type]
                    });

                    // set duration reducer state.isUpdating 
                    // to false by tracker.id
                    dispatch({
                        type: 'UPDATE_FINISHED',
                        payload: tracker
                    });

                    // clear the duration data state obj
                    setDurationHrMin({
                        ...durationHrMin,
                        [tracker.type]: {}
                    });

                    // clear inputs
                    e.target.reset();
                    return;

                // no cases are true send out alert to update description
                default:
                    alert('Please fill out a valid duration. Either a number from 1 - 24 for the hour field, or from 1-59 for the minutes field.');
                    return;
            };
            
    };

    // function to update state var based on input value
    const updateDuration = (e, tracker) => {


        /* conditional handles updating the
           state object durationHrMin
           and the isUpdating state object */

        // executes when the value of a
        // duration input is not an empty string
        if (e.target.value != '' && e.target.value > 0 ) {

            console.log('in if');
            // stop page load
            e.preventDefault();

            // dispatch to the duration reducer to
            // set state.isUpdating to true
            dispatch({
                type: 'UPDATE_DURATION',
                payload: tracker
            });

            // update state based on activity name
            // and the name of the input at event origin
            setDurationHrMin({
            ...durationHrMin,
                [tracker.type]: {
                    ...durationHrMin[tracker.type],
                    [e.target.name]: (e.target.value),
                    activity: tracker.type
                }
            });
        }

        // executes then the input value
        // is an empty string
        else {

            console.log('in else');
            // stop page load
            e.preventDefault();

            // dispatch to the duration reducer to
            // set state.isUpdating to false
            dispatch({
                type: 'UPDATE_FINISHED',
                payload: tracker
            });

            // update state based on property name
            setDurationHrMin({
                ...durationHrMin,
                [tracker.type]: {
                    ...durationHrMin[tracker.type],
                    [e.target.name]: e.target.value
                }
            });

        };
    };

    // function to handle submitting updates
    const submitUpdates = e => {

        // stop page load
        e.preventDefault();

        // dispatch array to duration saga

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

    // make tracker reducer state available as trackedActivities
    const trackedActivities = useSelector((store) => store.tracker);

    console.log(durationUpdates);
    console.log(durationHrMin);
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
                                name="hours"
                                onChange={e => updateDuration(e, tracker)}  
                                type="number" 
                                id={`${tracker.type}HoursIn`} /> hour(s)
                        </label>
                        <label htmlFor={`${tracker.type}MinutesIn`}>
                            <input 
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
                console.log(update);
                return (
                    <div key={i}>
                        <h4>{update.activity}</h4>
                        <p>Duration of activity:</p>
                        {update.hours === undefined ? 
                        <p>minute(s): {update.minutes}</p>
                        :
                        update.minutes === undefined ? 
                        <p>hour(s): {update.hours}</p>
                        :
                        <p>hour(s): {update.hours} <br/> minute(s): {update.minutes}</p>
                        }
                        <button>DELETE</button>
                    </div>
                )
            })}
            <input type="submit" disabled={durationUpdates.queue[0] ? false : true} onClick={e => submitUpdates(e)} />            
        </div>
    );
}

export default UpdateDuration;