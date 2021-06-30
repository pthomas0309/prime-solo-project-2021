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

    res.send(userActivities.rows);
  }

  // catch executes if theres an error (e) in try
  catch (e) {

    // abort sequel query
    await client.query('ROLLBACK');
    console.log('Error in activity router GET aborted:', e);

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
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;