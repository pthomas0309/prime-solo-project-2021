import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function UpdateDuration({dispatch}) {
  
    // make tracker reducer state available as trackedActivities
  const trackedActivities = useSelector((store) => store.tracker);

  return (
    <div>
      <h2>Duration Updates</h2>
      {trackedActivities?.map(tracker => {
          return (
              <label htmlFor=""></label>
          )
      })}
    </div>
  );
}

export default UpdateDuration;