// bring in useEffect
import React, {useEffect, useState} from 'react';

// bring in useSelector
import {useSelector} from 'react-redux';

// bring in delete button
import ActivityDeleteBtn from '../ActivityDeleteBtn/ActivityDeleteBtn'

// bring in edit button
import ActivityEditBtn from '../ActivityEditBtn/ActivityEditBtn';

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

    // state var for edit condition
    const [isEditing, setIsEditing] = useState(false);

    // state var for changes to activity.type
    const [typeChanges, setTypeChanges] = useState({edits: ''});

    // function to handle clicking edit
    const editEvent = (e, type) => {

        // stop page load
        e.preventDefault();

        // set isEditing to true to render edit input
        setIsEditing(true);

        // set typeChanges to be the value of activity.type
        setTypeChanges({edits: type});
    };

    // function to handle updates to activity.type
    const updateActivity = e => {
        
        // stop page load
        e.preventDefault();

        // update the state variable for
        // changes to the input
        setTypeChanges({edits: e.target.value});
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

                            {/* conditional rendering for edit */}
                            {isEditing ? 
                                
                                <label 
                                    htmlFor="editActivityIn">
                                    Update Activity Name
                                    <br/>
                                    <input required 
                                        type="text" 
                                        id="editActivityIn"
                                        onChange={ e => updateActivity(e)} 
                                        value={typeChanges.edits} 
                                    />

                                </label>
                            
                            :
                                <div>
                                    <p>{activity.type}</p>
                                    <ActivityDeleteBtn id={activity.id} userId={activity.user_id} deleteEvent={deleteEvent} />
                                    <ActivityEditBtn id={activity.id} type={activity.type} userId={activity.user_id} editEvent={editEvent} />
                                </div>
                            }

                        </div>
            })}
        </>
    )
}