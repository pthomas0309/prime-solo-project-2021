import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

// bring in useDispatch
import {useDispatch} from 'react-redux';


function AddTracker() {

    // make useDispatch available as dispatch
    const dispatch = useDispatch();
  
    // run on page load
    useEffect(() => {
        
        // call setReducers
        setReducers();
        
    }, []);

    // function to handle setting reducer
    // data in useEffect
    const setReducers = () => {

        // set the activity reducer to the activity data
        dispatch({
            type: 'FETCH_ACTIVITY'
        });

        // set the tracker reducer to the tracker data
        dispatch({
            type: 'FETCH_TRACKER'
        });

    }

    // state var for the id of the activity
    // to be tracked
    const [idToTrack, setIdToTrack] = useState({activityId: ''});

    // function to handle changing the select
    // dropdown
    const saveId = e => {
        
        // stop page load
        e.preventDefault();

        // set the state var to the option value
        setIdToTrack({activityId: e.target.value});

    };

    const addTracker = e => {

        // stop page load
        e.preventDefault();

        // conditional to check if an
        // activity was selected (not default)
        if (idToTrack.activityId != '0') {

            // dispatch to the tracker saga for
            // axios POST to /api/tracker
            dispatch({
                type: 'ADD_NEW_TRACKER',
                payload: idToTrack
            });

        }

        else {

            // alert the user to select an
            // activity
            alert('Please select an activity from the dropdown menu.');

        };

    };

    // bring in the activity reducer
    const userActivities = useSelector((store) => store.activity);

    return (
        <div>
        <h2>Track</h2>
        <form onSubmit={e => addTracker(e)}>
            <label>Please select an activity to track
                <br/>
                <select onChange={e => saveId(e)} name="activity" id="activity" >
                    <option value='0'>Select Activity</option>
                    {userActivities?.map(activity => {
                        return (
                            <option key={activity.id} value={activity.id}>{activity.type}</option>
                        )
                    })}
                </select>

            </label>
            <input type="submit" value="track" />
        </form>
        </div>
    );
}

export default AddTracker;