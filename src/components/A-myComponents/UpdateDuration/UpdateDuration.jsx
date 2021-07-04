import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function UpdateDuration({dispatch}) {
  
    // state variable for the duration of an activity
    const [durationHrMin, setDurationHrMin] = useState({});

    // state variable for the array of duration updates
    const [durationUpdates, setDurationUpdates] = useState([]);

    // state variable for queue
    const [isQueue, setIsQueue] = useState(false);

    // state variable for the activity being updated
    const [isUpdating, setIsUpdating] = useState({});

    // function to dispatch to duration saga
    const finalizeUpdate = (e, tracker) => {

            if 
            (
            durationHrMin[tracker.type].minutes > 0 
                &&
            durationHrMin[tracker.type].minutes <= 60 
            || 
            durationHrMin[tracker.type].hours > 0
                &&
            durationHrMin[tracker.type].hours < 24
            ) {

                console.log(tracker);
            // stop page load
            e.preventDefault();

            // push the update object into the queue array
            setDurationUpdates([...durationUpdates, durationHrMin[tracker.type]]);

            // set isQueue state var to true
            // enabling button
            setIsQueue(true)

            // reset the input isUpdatinf state obj
            setIsUpdating({
                ...isUpdating,
                [tracker.id]: {
                    hours: false,
                    minutes: false
                }
            });

            // update state based on property name
            setDurationHrMin({
                ...durationHrMin,
                [tracker.type]: {}
            });

            // clear the input
            e.target.reset();

            // alert the user that the update has been queued
            alert('Update added to the queue. Please hit submit after all updates have been queued.')
        }

        else {
            alert('Please update duration field.')
        }
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

            // set isUpdating boolean for the 
            // input that is the event origin
            setIsUpdating({
                ...isUpdating,
                [tracker.id]: {
                    ...isUpdating?.[tracker.id],
                    [e.target.name]: true
                }
            });

            // update state based on activity name
            // and the name of the input at event origin
            setDurationHrMin({
            ...durationHrMin,
                [tracker.type]: {
                    ...durationHrMin[tracker.type],
                    [e.target.name]: e.target.value,
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

            // set isUpdating boolean for the 
            // input that is the event origin
            setIsUpdating({
                ...isUpdating,
                [tracker.id]: {
                    ...isUpdating?.[tracker.id],
                    [e.target.name]: false
                }
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

        // reset the state array
        setDurationUpdates([])
    }

    // function to decide if 
    //the button is disabled or not
    const verifyIsUpdating = tracker => {

        // conditional to evaluate isUpdating obj
        // by tracker.id and input name attribute
        if (isUpdating?.[tracker.id]?.hours || isUpdating?.[tracker.id]?.minutes) {

            // one of the inputs have a
            // value that isn't an empty string
            // activate queue button
            return false;
        }

        // executes when both inputs have 
        // values of an empty string
        else {
            
            // disable queue button
            return true;
        };
    };

    // make tracker reducer state available as trackedActivities
    const trackedActivities = useSelector((store) => store.tracker);

    console.log(durationHrMin);
    console.log(isUpdating);
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
            {durationUpdates?.map((update, i) => {
                console.log(update);
                return (
                    <div key={i}>
                        <h4>{update.activity}</h4>
                        <p>Duration of activity:</p>
                        {update.hours ? 
                        <p>hour(s): {update.hours}</p>
                        :
                        <p>hour(s): 0</p>
                        }
                        {update.minutes ? 
                        <p>minute(s): {update.minutes}</p>
                        :
                        <p>minute(s): 0</p>
                        }
                        <button>DELETE</button>
                    </div>
                )
            })}
            <input type="submit" disabled={isQueue ? false : true} onClick={e => submitUpdates} />            
        </div>
    );
}

export default UpdateDuration;