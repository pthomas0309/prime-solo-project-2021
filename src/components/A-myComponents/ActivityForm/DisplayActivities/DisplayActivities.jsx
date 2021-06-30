// bring in useEffect
import {useEffect} from 'react';

// bring in useSelector
import {useSelector} from 'react-redux';

export default function DisplayActivities({dispatch}) {

    // useEffect to run the GET on page load
    useEffect( () => {

        // dispatch calls the saga that follows
        // the activities GET route
        dispatch({
            type: 'FETCH_ACTIVITY'
        })
    }, [])

    // set variable for the activities in the reducer
    const activityReducer = useSelector( store => store.activity )

    console.log(activityReducer);
    return (
        <>
            {/* .map over the array of activities
            and append a div with the activity name and
            a delete button that has the value of the activity */}
            {activityReducer.map( activity => {
                return  <div key={activity.id} >

                            <p>{activity.type}</p>
                            <button value={activity.id} onClick={() => deleteActivity(event)} >DELETE</button>

                        </div>
            })}
        </>
    )
}