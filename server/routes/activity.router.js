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
      SELECT *
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
catch (err) {

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

/**
 * DELETE route template
 */
 router.delete('/:activityId/:userId', rejectUnauthenticated, async (req, res) => {
    // DELETE route code here

    console.log(
        req.user.id
    );
    console.log(
        req.params
    );
    // if executes when the user id on the activity
    // matches the user logged in
    if (req.user.id == req.params.userId) {
        // create a client make the pool connection
        const client = await pool.connect();

        // try executes if theres no errors
        try{

            // variable for the activity id to delete
            const activityId = req.params.activityId;

            // start the transaction block
            await client.query('BEGIN');

            // SQL query to delete an activity by id
            const queryString = `
                DELETE FROM "user_activities" WHERE "user_activities".id = $1;
            `;

            // send the query to postgres
            await client

            // attach activity to post and user id in the query args.
            .query(queryString, [activityId]);

            // commit DB changes
            await client.query('COMMIT');

            // send a response code
            res.sendStatus(202);

        }
        
        // catch executes if theres an error (e) in try
        catch (err) {

            // abort sequel query
            await client.query('ROLLBACK');
            console.log('Error in activity router DELETE aborted:', err);
        
            // send rejected status code
            res.sendStatus(500);
        }
        
        // finally executes when try or catch is finished
        finally {
        
            // call the release callback
            client.release();
        };
    }

    // else executes if the user id that posted the
    // activity is not the same as the one logged in
    else {
        res.sendStatus(401)
    };

  });

  /**
 * PUT route template
 */
 router.put('/:activityId/:userId', rejectUnauthenticated, async (req, res) => {
    // PUT route code here

    console.log(
        req.user.id
    );
    console.log(
        req.params
    );
    // if executes when the user id on the activity
    // matches the user logged in
    if (req.user.id == req.params.userId) {
        // create a client make the pool connection
        const client = await pool.connect();

        // try executes if theres no errors
        try{

            // variable for the activity id to update
            const activityId = req.params.activityId;

            // variable for the changes to be made to type
            const typeUpdate = req.body.edits;

            // start the transaction block
            await client.query('BEGIN');

            // SQL query to update an activity by id
            const queryString = `
                UPDATE "user_activities" SET "type" = $1 WHERE "user_activities".id = $2;
            `;

            // send the query to postgres
            await client

            // attach activity to post and user id in the query args.
            .query(queryString, [typeUpdate, activityId]);

            // commit DB changes
            await client.query('COMMIT');

            // send a response code
            res.sendStatus(202);

        }
        
        // catch executes if theres an error (e) in try
        catch (err) {

            // abort sequel query
            await client.query('ROLLBACK');
            console.log('Error in activity router PUT aborted:', err);
        
            // send rejected status code
            res.sendStatus(500);
        }
        
        // finally executes when try or catch is finished
        finally {
        
            // call the release callback
            client.release();
        };
    }

    // else executes if the user id that posted the
    // activity is not the same as the one logged in
    else {
        res.sendStatus(401)
    };
});

module.exports = router;