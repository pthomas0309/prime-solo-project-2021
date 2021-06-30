const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// bring in authentication middleware
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
  // GET route code here
  // create a client make the pool connection
  const client = await pool.connect();

  // try executes if theres no errors
  try{

    // variable for the user id
    const userId = req.user.id;

    // start the transaction block
    await client.query('BEGIN');

    // queryString to get the activities
    // attatched to the user id sent in the request
    const queryString = `
      SELECT "user_activities".type, "user_activities".id
      FROM "user_activities"
      WHERE "user_activities".user_id = $1;
    `;

    // send the query to postgres
    const userActivities = await client
  
      // attach the user id in the query arg.
      .query(queryString, [userId]);
    
    console.log(userActivities.rows);

    // commit DB changes
    await client.query('COMMIT');

    res.send(userActivities.rows);
  }

  // catch executes if theres an error (err) in try
  catch (err) {

    // abort sequel query
    await client.query('ROLLBACK');
    console.log('Error in activity router GET aborted:', err);

    // send rejected status code
    res.sendStatus(500);
  }

  // finally executes when try or catch is finished
  finally {

    // call the release callback
    client.release();
  };

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // POST route code here

  // create a client make the pool connection
  const client = await pool.connect();

  // try executes if theres no errors
  try{

    // variable for the user id
    const userId = req.user.id;

    // variable for the activity to post
    const activity = req.body.activity;
    console.log(activity);

    // start the transaction block
    await client.query('BEGIN');

    // querySting to insert the data into "user_activities"
    const queryString = `
        INSERT INTO "user_activities" ("type", "user_id")
        VALUES ($1, $2);
    `;

    // send the query to postgres
    await client

        // attach activity to post and user id in the query args.
        .query(queryString, [activity, userId]);
    
    // commit DB changes
    await client.query('COMMIT');

    res.sendStatus(201);

}

// catch executes if theres an error (e) in try
catch (errr) {

  // abort sequel query
  await client.query('ROLLBACK');
  console.log('Error in activity router POST aborted:', err);

  // send rejected status code
  res.sendStatus(500);
}

// finally executes when try or catch is finished
finally {

  // call the release callback
  client.release();
};
});

module.exports = router;