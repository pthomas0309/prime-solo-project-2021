const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
  // POST route code here
});

/**
 * DELETE route template
 */
 router.delete('/', async (req, res) => {
  // DELETE route code here
});

/**
 * PUT route template
 */
 router.put('/', async (req, res) => {
  // PUT route code here
});

module.exports = router;
