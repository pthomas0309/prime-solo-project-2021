// bring in the DisplayActivities component
import DisplayActivities from './DisplayActivities/DisplayActivities'

// bring in useState
import {useState} from 'react';

// bring in useDispatch
import {useDispatch} from 'react-redux';

// bring in useEffect
import {useEffect} from 'react';

export default function ActivityForm() {

    // useEffect to run the GET on page load
    useEffect( () => {

        // dispatch calls the saga that follows
        // the activities GET route
        dispatch({
            type: 'FETCH_ACTIVITY'
        });
    }, []);

    // make useDispatch available as dispatch
    const dispatch = useDispatch();

    // set up state variable for the activity input
    const [activityName, setActivityName] = useState({ activity: '' });

    // function for onChange of activityIn target
    const createActivity = e => {

        // stop page load
        e.preventDefault();

        // update state variable for activity
        setActivityName({ activity: event.target.value });
    };

    // function for onSubmit of the form target
    const addActivity = e => {

        // stop page load
        e.preventDefault();

        // dispatch to the activities saga for the POST
        dispatch({
            type: 'ADD_NEW_ACTIVITY',
            payload: activityName
        });

        // clear input
        setActivityName({ activity: '' });

    }

    console.log(activityName);
    return (
        <>
            <h2>Welcome,</h2>

            {/* Activity input field */}
            <div>

                <form onSubmit={ e => addActivity(e)} >

                    <label 
                        htmlFor="activityIn">
                        Let's start off by creating some activities to keep track of
                        <br/>
                        <input required 
                            type="text" 
                            id="activityIn" 
                            placeholder="Name activity here" 
                            onChange={ e => createActivity(e)} 
                            value={activityName.activity} 
                        />

                    </label>

                    <input type="submit" value="ADD" />

                </form>
            </div>

            {/* Displays all activities added */}
            <DisplayActivities dispatch={dispatch} />
        </>
    )
}