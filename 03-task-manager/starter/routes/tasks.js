const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;

// ===== Rest Api =======

// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task

/*
GET    - This operation reads information from a record in the database.  
PUT    - This operation changes a record's information in the database.  
POST   - This operation creates a new record in the database.  
PATCH  - This operation updates an existing resource, but does not require sending the entire body with the request.
DELETE - This operation removes a record from the database. 
*/

/*

Difference between patch and put:

PUT and PATCH both perform modifications on existing data,
but they do so differently because of idempotency.
PUT modifies a record's information and creates a new
record if one is not available, and PATCH updates a resource
without sending the entire body in the request.

A programmer should know the differences between the HTTP PUT and HTTP PATCH.
PUT updates a resource, while PATCH sends a set of instructions to the URI
to update the child resource. Changing records inappropriately can have
unforeseen consequences for your web application!
*/