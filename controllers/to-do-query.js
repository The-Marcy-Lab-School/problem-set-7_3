const pool = require('../db')

const greetUser = (req, res) => {
    res.send('To Do List API')
}

async function getAllUncompletedTasks(req, res) {
  try {
    const {user_id} = req.body
    const queryText = 'SELECT * FROM task WHERE is_complete = false AND user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}

async function getAllCompletedTasks(req, res) {
  try {
    const {user_id} = req.body
    const queryText = 'SELECT * FROM task WHERE is_complete = true AND user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}

async function getAllTasks(req, res) {
  try {
    const {user_id} = req.body
    const queryText = 'SELECT * FROM task WHERE user_id = $1;'
    const client = await pool.connect();
    const result = await client.query(queryText, [user_id]);
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  }
  catch (err) {
    console.error(err);
    res.send(err);
  }
}



module.exports = {
    greetUser,
    getAllTasks,
    getAllCompletedTasks,
    getAllUncompletedTasks,
}