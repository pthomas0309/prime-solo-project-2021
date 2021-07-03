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

    // queryString to get the trackers
    // attatched to the user id sent in the request
    const queryString = `
      SELECT "user_activities".type, "tracker".*
      FROM "user_activities"
      JOIN "tracker"
      ON "user_activities".id = "tracker".activity_id
      WHERE "tracker".user_id = $1;
    `;

    // send the query to postgres
    const userTrackers = await client
  
      // attach the user id in the query arg.
      .query(queryString, [userId]);
    
    console.log(userTrackers.rows);

    // commit DB changes
    await client.query('COMMIT');

    res.send(userTrackers.rows);
  }

  // catch executes if theres an error (err) in try
  catch (err) {

    // abort sequel query
    await client.query('ROLLBACK');
    console.log('Error in tracker router GET aborted:', err);

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
  console.log('In tracker.router POST');

  // create a client make the pool connection
  const client = await pool.connect();

  // try executes if theres no errors
  try{

    // variable for the user id
    const userId = req.user.id;

    // variable for the activity id
    const activityId = req.body.activityId

    // start the transaction block
    await client.query('BEGIN');

    // queryString to make a new row in the
    // tracker table with a userId and an activityId
    const queryString = `
      INSERT INTO "tracker" ("activity_id", "user_id")
      VALUES ($1, $2);
    `;

    // send the query to postgres
    await client
  
      // attach the user id in the query arg.
      .query(queryString, [activityId, userId]);

    // commit DB changes
    await client.query('COMMIT');

    // send good status code
    res.sendStatus(201);
  }

  // catch executes if theres an error (err) in try
  catch (err) {

    // abort sequel query
    await client.query('ROLLBACK');
    console.log('Error in tracker router GET aborted:', err);

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