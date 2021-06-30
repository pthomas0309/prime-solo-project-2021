// bring in useEffect
import React, {useEffect} from 'react';

// bring in useSelector
import {useSelector} from 'react-redux';

export default function DisplayActivities({dispatch}) {

    // useEffect to run the GET on page load
    useEffect( () => {

        // dispatch calls the saga that follows
        // the activities GET route
        dispatch({
            type: 'FETCH_ACTIVITY'
        });
    }, []);

    // function to handle clicking delete
    const deleteEvent = e => {

        // stop page load
        e.preventDefault();

        console.log(e.target.value);
        console.log(e.target.id);

        // action for activity saga 'DELETE ACTIVITY'
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: {activityId: e.target.id, userId: e.target.value}
        });

    };

    // set variable for the activities in the reducer
    const activityReducer = useSelector( store => store.activity );

    console.log(activityReducer);
    return (
        <>
            {/* .map over the array of activities
            and append a div with the activity name and
            a delete button that has the value of the activity */}
            {activityReducer.map( activity => {
                console.log(activity);
                return  <div key={activity.id} >

                            <p>{activity.type}</p>
                            <button id={activity.id} value={activity.user_id} onClick={ e => deleteEvent(e)} >DELETE</button>
                        </div>
            })}
        </>
    )
}