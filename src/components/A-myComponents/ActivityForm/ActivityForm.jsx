// bring in the DisplayActivities component
import DisplayActivities from './DisplayActivities/DisplayActivities'

// bring in useState
import {useState} from 'react';

// bring in useDispatch
import {useDispatch} from 'react-redux';

export default function ActivityForm() {

    // make useDispatch available as dispatch
    const dispatch = useDispatch();

    // set up state variable for the activity input
    const [activityName, setActivityName] = useState('');

    // function for onChange of activityIn target
    const createActivity = event => {

        // stop page load
        event.preventDefault();

        // update state variable for activity
        setActivityName(event.target.value);
    };

    // function for onSubmit of the form target
    const addActivity = event => {

        // stop page load
        event.preventDefault();

        // dispatch to the activities saga for the POST
        dispatch({
            type: 'ADD_NEW_ACTIVITY',
            payload: activityName
        })

        // clear input
        setActivityName('')

    }

    console.log(activityName);
    return (
        <>
            <h2>Welcome,</h2>

            {/* Activity input field */}
            <div>

                <form onSubmit={addActivity} >

                    <label 
                        htmlFor="activityIn">
                        Let's start off by creating some activities to keep track of
                        <br/>
                        <input required 
                            type="text" 
                            id="activityIn" 
                            placeholder="Name activity here" 
                            onChange={createActivity} 
                            value={activityName} 
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